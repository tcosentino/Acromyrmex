import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import createMentionPlugin, { defaultTheme } from 'draft-js-mention-plugin';
import { ENTITY_TYPE } from 'draft-js-utils';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import 'draft-js/dist/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import suggestionFilter from './suggestionsFilter';
import Mention from './Mention';
import Toolbar from './Toolbar';
import getEntityAtCursor from './getEntityAtCursor';
import LinkDecorator from './LinkDecorator';
import stateToMarkdown from './stateToMarkdown';
import stateToPlainText from './stateToPlainText';
import stateFromMarkdown from './stateFromMarkdown';
import stateFromPlainText from './stateFromPlainText';
import clearEntityForRange from './clearEntityForRange';
import './Editor.css';

const TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
const OPTION_MENTION_INDEX = 0;

class OurEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Editor state is
      suggestions: []
    };

    this.mentionFunctionInfo = [];
    this.mentionPlugins = [];
    this.searchFunctions = [];
    this.mentionStateFromMarkdownFunctions = [];
    this.mentionStateToMarkdownFunctions = [];

    const emptyState = EditorState.createEmpty();
    this.state.editorState = emptyState;

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this._onInlineClicked = this._onInlineClicked.bind(this);
    this._onBlockClicked = this._onBlockClicked.bind(this);
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._onUnlinkClicked = this._onUnlinkClicked.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.getEntityAtCursor = this.getEntityAtCursor.bind(this);

    this.startMentions();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    const { options } = this.props;
    const { suggestions, editorState } = this.state;
    const hasValue = input && input.value && input.value.length;
    const newSuggestions = [...suggestions];

    // set our normal suggestions
    newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(nextProps.options);

    // update our options list
    if (options.length !== nextProps.options.length) {
      this.setState({ suggestions: newSuggestions }, () => {
        if (hasValue) {
          this.onChange(
            EditorState.push(
              editorState,
              this.getStateFromMarkdown(input.value).getCurrentContent()
            )
          );
        }
      });
    }
  }

  componentDidUpdate() {
    const {
      input: { value }
    } = this.props;
    const { editorState } = this.state;
    const md = this.getStateToMarkdown(editorState);
    // update the value if needed
    if (md !== value) {
      this.onChange(
        EditorState.push(editorState, this.getStateFromMarkdown(value).getCurrentContent())
      );
    }
  }

  /**
   * Runs when the editor value is changed by the user (usually typing)
   */
  onChange(editorState) {
    const {
      input: { onChange }
    } = this.props;
    const md = this.getStateToMarkdown(editorState);

    onChange(md);
    this.setState({ editorState });
  }

  onFocus() {
    this.editor.focus();
  }

  onSuggestionSearch(functionInfo, { value }) {
    const { [functionInfo.suggestionProp]: suggestionProps } = this.props;
    const { suggestions } = this.state;
    const newSuggestions = [...suggestions];

    // set our normal suggestions
    newSuggestions[functionInfo.index] = suggestionFilter(value, this.fixOptions(suggestionProps));

    this.setState({ suggestions: newSuggestions });
  }

  getStateFromMarkdown(value) {
    const { plainText } = this.props;
    const { suggestions } = this.state;

    return EditorState.createWithContent(
      plainText
        ? stateFromPlainText(value, suggestions, this.mentionStateFromMarkdownFunctions)
        : stateFromMarkdown(value, suggestions, this.mentionStateFromMarkdownFunctions),
      new MultiDecorator([new CompositeDecorator([LinkDecorator])])
    );
  }

  getStateToMarkdown(editorState) {
    const { plainText } = this.props;

    if (plainText) {
      return stateToPlainText(
        editorState.getCurrentContent(),
        this.mentionStateToMarkdownFunctions
      );
    }

    return stateToMarkdown(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
  }

  getEntityAtCursor() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const entity = getEntityAtCursor(editorState);
    return entity == null ? null : contentState.getEntity(entity.entityKey);
  }

  startMentions() {
    const { input, options } = this.props;
    const { editorState } = this.state;
    const hasValue = input && input.value && input.value.length;

    const mentions = [];
    mentions[OPTION_MENTION_INDEX] = this.addMentionPlugin({
      regex: TEMPLATE_REGEX,
      index: OPTION_MENTION_INDEX,
      trigger: '{',
      suggestionProp: 'options'
    });

    if (this.extraMentions) {
      this.extraMentions().forEach(extraMention => {
        mentions[extraMention.index] = this.addMentionPlugin(extraMention);
      });
    }

    // since this is called from the constructor we just set state directly
    this.state.suggestions = mentions;

    if (hasValue) {
      const newState = EditorState.push(
        editorState,
        this.getStateFromMarkdown(input.value, options).getCurrentContent()
      );

      const md = this.getStateToMarkdown(newState);
      input.onChange(md);

      this.state.editorState = newState;
    }
  }

  addMentionPlugin(functionInfo) {
    const { [functionInfo.suggestionProp]: suggestionProps } = this.props;

    this.mentionFunctionInfo.push(functionInfo);

    this.mentionPlugins.push(
      createMentionPlugin({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: functionInfo.trigger,
        theme: { ...defaultTheme, ...functionInfo.theme }
        // supportWhitespace: true,
      })
    );

    this.searchFunctions.push(this.onSuggestionSearch.bind(this, functionInfo));

    this.mentionStateFromMarkdownFunctions.push((raw, entityCount, block, mentions, tempText) => {
      const { text } = block;
      // Loop over the matches
      block.text = text.replace(functionInfo.regex, match => {
        const matchingOption = mentions.find(m => m.textValue === match);

        if (!matchingOption) {
          return match;
        }

        const entityRange = {
          offset: tempText.indexOf(match),
          length: matchingOption.name.length,
          key: entityCount
        };

        block.entityRanges.forEach(range => {
          const thisEnd = entityRange.offset + entityRange.length;
          const otherOffset = range.offset;
          const difference = match.length - matchingOption.name.length;

          if (thisEnd < otherOffset) {
            range.offset -= difference;
          }
        });

        block.entityRanges.push(entityRange);
        raw.entityMap[`${entityCount}`] = {
          type: `${functionInfo.trigger}mention`,
          mutability: 'IMMUTABLE',
          data: {
            mention: Map(matchingOption)
          }
        };

        entityCount += 1;

        // we want to follow along to calculate offsets
        tempText = tempText.replace(match, matchingOption.name);

        return matchingOption.name;
      });

      return { entityCount, tempText };
    });

    this.mentionStateToMarkdownFunctions.push(entity => {
      if (entity.getType() !== `${functionInfo.trigger}mention`) {
        return false;
      }

      // mentions
      const data = entity.getData();
      return data.mention.get('textValue');
    });

    // set our suggestions
    return this.fixOptions(suggestionProps);
  }

  // added so we can include the stepname in the display
  fixOptions(options) {
    const { fixOptions } = this.props;
    return options.map(fixOptions);
  }

  _onInlineClicked(style = 'BOLD') {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, style));
  }

  _onBlockClicked(style = 'code-block') {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, style));
  }

  _onLinkClicked(url) {
    const { editorState } = this.state;
    let contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    contentState = contentState.createEntity(ENTITY_TYPE.LINK, 'MUTABLE', {
      url
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    const newEditorState = EditorState.push(editorState, contentState);
    // this.setState({ showLinkInput: false });
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));

    // Hacky: Wait to focus the editor so we don't lose selection.
    setTimeout(() => {
      this.onFocus();
    }, 50);
  }

  _onUnlinkClicked() {
    const { editorState } = this.state;
    const entity = getEntityAtCursor(editorState);
    if (entity != null) {
      const { blockKey, startOffset, endOffset } = entity;
      this.onChange(clearEntityForRange(editorState, blockKey, startOffset, endOffset));
    }
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { disableToolbar, className, onFocus, onBlur, plainText } = this.props;
    const { editorState, suggestions } = this.state;
    const { searchFunctions, mentionFunctionInfo } = this;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const editor = (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        plugins={[...this.mentionPlugins]}
        handleKeyCommand={this.handleKeyCommand}
        placeholder="Enter a value..."
        decorators={[LinkDecorator]}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={e => {
          this.editor = e;
        }}
      />
    );

    return (
      <div className={`editor-input ${className}`}>
        {!disableToolbar && !plainText && (
          <Toolbar
            getEntityAtCursor={this.getEntityAtCursor}
            selection={selection}
            blockType={blockType}
            undoSize={editorState.getUndoStack().size}
            redoSize={editorState.getRedoStack().size}
            onInlineClicked={this._onInlineClicked}
            onBlockClicked={this._onBlockClicked}
            onLinkClicked={this._onLinkClicked}
            onUnlinkClicked={this._onUnlinkClicked}
            onUndoClicked={() => this.onChange(EditorState.undo(editorState))}
            onRedoClicked={() => this.onChange(EditorState.redo(editorState))}
          />
        )}
        {!disableToolbar && !plainText ? <div className="template-editor">{editor}</div> : editor}
        <div className="mention-suggestions clearFix">
          {this.mentionPlugins.map((mentionPlugin, index) => {
            const { MentionSuggestions } = mentionPlugin;

            return (
              <MentionSuggestions
                onSearchChange={searchFunctions[index]}
                suggestions={suggestions[index] || []}
                entryComponent={Mention}
                key={`${mentionFunctionInfo[index].trigger}_suggestion`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

OurEditor.propTypes = {
  input: PropTypes.shape().isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
  disableToolbar: PropTypes.bool,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  fixOptions: PropTypes.func,
  plainText: PropTypes.bool
};

OurEditor.defaultProps = {
  options: [],
  onChange: () => {},
  disableToolbar: false,
  className: '',
  onFocus: () => {},
  onBlur: () => {},
  fixOptions: o => ({ ...o, attributeName: o.name, name: `${o.stepName} -> ${o.name}` }),
  plainText: false
};

export default OurEditor;
