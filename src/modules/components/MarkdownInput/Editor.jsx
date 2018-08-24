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
import stateFromMarkdown from './stateFromMarkdown';
import clearEntityForRange from './clearEntityForRange';
import './Editor.css';

const TEMPLATE_REGEX = /{(\S*-*)([0-9a-zA-Z-]+)}/g;
const OPTION_MENTION_INDEX = 0;

class OurEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Editor state is
      suggestions: [],
    };

    this.state.editorState =
      props && props.input && props.input.value && props.input.value.length
        ? this.getStateFromMarkdown(props.input.value, props.options)
        : EditorState.createEmpty();

    this.mentionFunctionInfo = [];
    this.mentionPlugins = [];
    this.searchFunctions = [];
    this.mentionStateFromMarkdownFunctions = [];
    this.mentionStateToMarkdownFunctions = [];

    this.addMentionPlugin({
      regex: TEMPLATE_REGEX,
      index: OPTION_MENTION_INDEX,
      trigger: '{',
      suggestionProp: 'options',
    });

    this.mentionRef = null;

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this._onInlineClicked = this._onInlineClicked.bind(this);
    this._onBlockClicked = this._onBlockClicked.bind(this);
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._onUnlinkClicked = this._onUnlinkClicked.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.getEntityAtCursor = this.getEntityAtCursor.bind(this);
  }

  componentWillMount() {
    const { input, options } = this.props;
    const hasValue = input && input.value && input.value.length;
    const newSuggestions = [...this.state.suggestions];

    // set our normal suggestions
    newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(options);

    this.setState({ suggestions: newSuggestions }, () => {
      if (hasValue) {
        this.onChange(
          EditorState.push(
            this.state.editorState,
            this.getStateFromMarkdown(input.value, options).getCurrentContent(),
          ),
        );
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    const hasValue = input && input.value && input.value.length;
    const newSuggestions = [...this.state.suggestions];

    // set our normal suggestions
    newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(nextProps.options);

    // update our options list
    if (this.props.options.length !== nextProps.options.length) {
      this.setState({ suggestions: newSuggestions }, () => {
        if (hasValue) {
          this.onChange(
            EditorState.push(
              this.state.editorState,
              this.getStateFromMarkdown(input.value).getCurrentContent(),
            ),
          );
        }
      });
    }
  }

  componentDidUpdate() {
    const { editorState } = this.state;
    const md = this.getStateToMarkdown(editorState);
    // update the value if needed
    if (md !== this.props.input.value) {
      this.onChange(
        EditorState.push(
          this.state.editorState,
          this.getStateFromMarkdown(this.props.input.value).getCurrentContent(),
        ),
      );
    }
  }

  /**
   * Runs when the editor value is changed by the user (usually typing)
   */
  onChange(editorState) {
    const md = this.getStateToMarkdown(editorState);

    // console.log(JSON.stringify(editorState.getCurrentContent(), null, 2));

    this.props.input.onChange(md);
    this.setState({ editorState });
  }

  onFocus() {
    this.editor.focus();
  }

  getStateFromMarkdown(value) {
    return EditorState.createWithContent(
      stateFromMarkdown(value, this.state.suggestions, this.mentionStateFromMarkdownFunctions),
      new MultiDecorator([new CompositeDecorator([LinkDecorator])]),
    );
  }

  getStateToMarkdown(editorState) {
    return stateToMarkdown(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
  }

  getEntityAtCursor() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const entity = getEntityAtCursor(editorState);
    return entity == null ? null : contentState.getEntity(entity.entityKey);
  }

  addMentionPlugin(functionInfo) {
    const nSuggestions = [...this.state.suggestions];

    // set our normal suggestions
    nSuggestions[functionInfo.index] = this.fixOptions(this.props[functionInfo.suggestionProp]);
    this.state.suggestions = nSuggestions;

    this.mentionFunctionInfo.push(functionInfo);

    this.mentionPlugins.push(
      createMentionPlugin({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: functionInfo.trigger,
        theme: { ...defaultTheme, ...functionInfo.theme },
        // supportWhitespace: true,
      }),
    );

    this.searchFunctions.push(({ value }) => {
      const newSuggestions = [...this.state.suggestions];

      // set our normal suggestions
      newSuggestions[functionInfo.index] = suggestionFilter(
        value,
        this.fixOptions(this.props[functionInfo.suggestionProp]),
      );

      this.setState({ suggestions: newSuggestions });
    });

    this.mentionStateFromMarkdownFunctions.push((raw, entityCount, block, mentions, tempText) => {
      const text = block.text;
      // Loop over the matches
      block.text = text.replace(functionInfo.regex, (match) => {
        const matchingOption = mentions.find(m => m.textValue === match);
        if (!matchingOption) {
          return match;
        }

        console.log(tempText);
        const entityRange = {
          offset: tempText.indexOf(match),
          length: matchingOption.name.length,
          key: entityCount,
        };

        block.entityRanges.forEach((range) => {
          const thisEnd = entityRange.offset + entityRange.length;
          const otherOffset = range.offset;
          const difference = match.length - matchingOption.name.length;
          console.log({
            thisOffset: entityRange.offset,
            thisEnd,
            otherOffset,
            difference,
          });

          if (thisEnd < otherOffset) {
            range.offset -= difference;
          }
        });

        block.entityRanges.push(entityRange);
        raw.entityMap[`${entityCount}`] = {
          type: `${functionInfo.trigger}mention`,
          mutability: 'IMMUTABLE',
          data: {
            mention: Map(matchingOption),
          },
        };

        entityCount += 1;

        // we want to follow along to calculate offsets
        tempText = tempText.replace(match, matchingOption.name);

        return matchingOption.name;
      });

      return { entityCount, tempText };
    });

    this.mentionStateToMarkdownFunctions.push((entity) => {
      if (entity.getType() !== `${functionInfo.trigger}mention`) {
        return false;
      }

      // mentions
      const data = entity.getData();
      return data.mention.get('textValue');
    });
  }

  // added so we can include the stepname in the display
  fixOptions(options) {
    return options.map(this.props.fixOptions);
  }

  _onInlineClicked(style = 'BOLD') {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  _onBlockClicked(style = 'code-block') {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  }

  _onLinkClicked(url) {
    const { editorState } = this.state;
    let contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    contentState = contentState.createEntity(ENTITY_TYPE.LINK, 'MUTABLE', {
      url,
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    const newEditorState = EditorState.push(editorState, contentState);
    this.setState({ showLinkInput: false });
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
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { disableToolbar, className, onFocus, onBlur } = this.props;
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const editor = (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={[...this.mentionPlugins]}
        handleKeyCommand={this.handleKeyCommand}
        placeholder="Enter a value..."
        decorators={[LinkDecorator]}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={(e) => {
          this.editor = e;
        }}
      />
    );

    return (
      <div className={`editor-input ${className}`}>
        {!disableToolbar && (
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
        {!disableToolbar ? <div className="template-editor">{editor}</div> : editor}
        <div className="mention-suggestions clearFix">
          {this.mentionPlugins.map((mentionPlugin, index) => {
            const { MentionSuggestions } = mentionPlugin;
            return (
              <MentionSuggestions
                onSearchChange={this.searchFunctions[index]}
                suggestions={this.state.suggestions[index] || []}
                entryComponent={Mention}
                key={`${this.mentionFunctionInfo[index].trigger}_suggestion`}
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
};

OurEditor.defaultProps = {
  options: [],
  onChange: () => {},
  disableToolbar: false,
  className: '',
  onFocus: () => {},
  onBlur: () => {},
  fixOptions: o => ({ ...o, attributeName: o.name, name: `${o.stepName} -> ${o.name}` }),
};

export default OurEditor;
