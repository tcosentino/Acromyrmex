import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import { ENTITY_TYPE } from 'draft-js-utils';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import 'draft-js/dist/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import Mention from './Mention';
import Toolbar from './Toolbar';
import getEntityAtCursor from './getEntityAtCursor';
import LinkDecorator from './LinkDecorator';
import stateToMarkdown from './stateToMarkdown';
import stateFromMarkdown from './stateFromMarkdown';
import clearEntityForRange from './clearEntityForRange';
import './Editor.css';

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  mentionTrigger: '{',
});
const { MentionSuggestions } = mentionPlugin;

class OurEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Editor state is
      editorState:
        props && props.input && props.input.value && props.input.value.length
          ? EditorState.createWithContent(
              stateFromMarkdown(props.input.value, props.options),
              new MultiDecorator([new CompositeDecorator([LinkDecorator])]),
            )
          : EditorState.createEmpty(),
      suggestions: props.options,
    };

    this.mentionRef = null;

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this._onInlineClicked = this._onInlineClicked.bind(this);
    this._onBlockClicked = this._onBlockClicked.bind(this);
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._onUnlinkClicked = this._onUnlinkClicked.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.getEntityAtCursor = this.getEntityAtCursor.bind(this);
  }

  /**
   * Runs when the editor value is changed by the user (usually typing)
   */
  onChange(editorState) {
    const md = stateToMarkdown(editorState.getCurrentContent());

    this.props.input.onChange(md);
    this.setState({ editorState });
  }

  onFocus() {
    this.editor.focus();
  }

  onSearchChange({ value }) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.props.options),
    });
  }

  getEntityAtCursor() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const entity = getEntityAtCursor(editorState);
    return entity == null ? null : contentState.getEntity(entity.entityKey);
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
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="template-input">
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
        <div className="template-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[mentionPlugin]}
            handleKeyCommand={this.handleKeyCommand}
            placeholder="Enter a value..."
            decorators={[LinkDecorator]}
            ref={(e) => {
              this.editor = e;
            }}
          />
        </div>
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
          entryComponent={Mention}
        />
      </div>
    );
  }
}

OurEditor.propTypes = {
  input: PropTypes.shape().isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
};

OurEditor.defaultProps = {
  options: [],
  onChange: () => {},
};

export default OurEditor;
