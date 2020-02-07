'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require('draft-js');

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _draftJsUtils = require('draft-js-utils');

var _MultiDecorator = require('draft-js-plugins-editor/lib/Editor/MultiDecorator');

var _MultiDecorator2 = _interopRequireDefault(_MultiDecorator);

require('draft-js/dist/Draft.css');

require('draft-js-mention-plugin/lib/plugin.css');

var _suggestionsFilter = require('./suggestionsFilter');

var _suggestionsFilter2 = _interopRequireDefault(_suggestionsFilter);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _getEntityAtCursor2 = require('./getEntityAtCursor');

var _getEntityAtCursor3 = _interopRequireDefault(_getEntityAtCursor2);

var _LinkDecorator = require('./LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _stateToMarkdown = require('./stateToMarkdown');

var _stateToMarkdown2 = _interopRequireDefault(_stateToMarkdown);

var _stateToPlainText = require('./stateToPlainText');

var _stateToPlainText2 = _interopRequireDefault(_stateToPlainText);

var _stateFromMarkdown = require('./stateFromMarkdown');

var _stateFromMarkdown2 = _interopRequireDefault(_stateFromMarkdown);

var _stateFromPlainText = require('./stateFromPlainText');

var _stateFromPlainText2 = _interopRequireDefault(_stateFromPlainText);

var _clearEntityForRange = require('./clearEntityForRange');

var _clearEntityForRange2 = _interopRequireDefault(_clearEntityForRange);

require('./Editor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
var OPTION_MENTION_INDEX = 0;

var OurEditor = function (_React$Component) {
  _inherits(OurEditor, _React$Component);

  function OurEditor(props) {
    _classCallCheck(this, OurEditor);

    var _this = _possibleConstructorReturn(this, (OurEditor.__proto__ || Object.getPrototypeOf(OurEditor)).call(this, props));

    _this.state = {
      // Editor state is
      suggestions: []
    };

    _this.mentionFunctionInfo = [];
    _this.mentionPlugins = [];
    _this.searchFunctions = [];
    _this.mentionStateFromMarkdownFunctions = [];
    _this.mentionStateToMarkdownFunctions = [];

    var emptyState = _draftJs.EditorState.createEmpty();
    _this.state.editorState = emptyState;

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this._onInlineClicked = _this._onInlineClicked.bind(_this);
    _this._onBlockClicked = _this._onBlockClicked.bind(_this);
    _this._onLinkClicked = _this._onLinkClicked.bind(_this);
    _this._onUnlinkClicked = _this._onUnlinkClicked.bind(_this);
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.getEntityAtCursor = _this.getEntityAtCursor.bind(_this);
    return _this;
  }

  _createClass(OurEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var _props = this.props,
          input = _props.input,
          options = _props.options;
      var editorState = this.state.editorState;

      var hasValue = input && input.value && input.value.length;

      var mentions = [];
      mentions[OPTION_MENTION_INDEX] = this.addMentionPlugin({
        regex: TEMPLATE_REGEX,
        index: OPTION_MENTION_INDEX,
        trigger: '{',
        suggestionProp: 'options'
      });

      if (this.extraMentions) {
        this.extraMentions().forEach(function (extraMention) {
          mentions[extraMention.index] = _this2.addMentionPlugin(extraMention);
        });
      }

      this.setState({ suggestions: mentions }, function () {
        if (hasValue) {
          _this2.onChange(_draftJs.EditorState.push(editorState, _this2.getStateFromMarkdown(input.value, options).getCurrentContent()));
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var input = nextProps.input;
      var options = this.props.options;
      var _state = this.state,
          suggestions = _state.suggestions,
          editorState = _state.editorState;

      var hasValue = input && input.value && input.value.length;
      var newSuggestions = [].concat(_toConsumableArray(suggestions));

      // set our normal suggestions
      newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(nextProps.options);

      // update our options list
      if (options.length !== nextProps.options.length) {
        this.setState({ suggestions: newSuggestions }, function () {
          if (hasValue) {
            _this3.onChange(_draftJs.EditorState.push(editorState, _this3.getStateFromMarkdown(input.value).getCurrentContent()));
          }
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var value = this.props.input.value;
      var editorState = this.state.editorState;

      var md = this.getStateToMarkdown(editorState);
      // update the value if needed
      if (md !== value) {
        this.onChange(_draftJs.EditorState.push(editorState, this.getStateFromMarkdown(value).getCurrentContent()));
      }
    }

    /**
     * Runs when the editor value is changed by the user (usually typing)
     */

  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      var onChange = this.props.input.onChange;

      var md = this.getStateToMarkdown(editorState);

      onChange(md);
      this.setState({ editorState: editorState });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.editor.focus();
    }
  }, {
    key: 'onSuggestionSearch',
    value: function onSuggestionSearch(functionInfo, _ref) {
      var value = _ref.value;
      var suggestionProps = this.props[functionInfo.suggestionProp];
      var suggestions = this.state.suggestions;

      var newSuggestions = [].concat(_toConsumableArray(suggestions));

      // set our normal suggestions
      newSuggestions[functionInfo.index] = (0, _suggestionsFilter2.default)(value, this.fixOptions(suggestionProps));

      this.setState({ suggestions: newSuggestions });
    }
  }, {
    key: 'getStateFromMarkdown',
    value: function getStateFromMarkdown(value) {
      var plainText = this.props.plainText;
      var suggestions = this.state.suggestions;


      return _draftJs.EditorState.createWithContent(plainText ? (0, _stateFromPlainText2.default)(value, suggestions, this.mentionStateFromMarkdownFunctions) : (0, _stateFromMarkdown2.default)(value, suggestions, this.mentionStateFromMarkdownFunctions), new _MultiDecorator2.default([new _draftJs.CompositeDecorator([_LinkDecorator2.default])]));
    }
  }, {
    key: 'getStateToMarkdown',
    value: function getStateToMarkdown(editorState) {
      var plainText = this.props.plainText;


      if (plainText) {
        return (0, _stateToPlainText2.default)(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
      }

      return (0, _stateToMarkdown2.default)(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
    }
  }, {
    key: 'getEntityAtCursor',
    value: function getEntityAtCursor() {
      var editorState = this.state.editorState;

      var contentState = editorState.getCurrentContent();
      var entity = (0, _getEntityAtCursor3.default)(editorState);
      return entity == null ? null : contentState.getEntity(entity.entityKey);
    }
  }, {
    key: 'addMentionPlugin',
    value: function addMentionPlugin(functionInfo) {
      var suggestionProps = this.props[functionInfo.suggestionProp];


      this.mentionFunctionInfo.push(functionInfo);

      this.mentionPlugins.push((0, _draftJsMentionPlugin2.default)({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: functionInfo.trigger,
        theme: _extends({}, _draftJsMentionPlugin.defaultTheme, functionInfo.theme)
        // supportWhitespace: true,
      }));

      this.searchFunctions.push(this.onSuggestionSearch.bind(this, functionInfo));

      this.mentionStateFromMarkdownFunctions.push(function (raw, entityCount, block, mentions, tempText) {
        var text = block.text;
        // Loop over the matches

        block.text = text.replace(functionInfo.regex, function (match) {
          var matchingOption = mentions.find(function (m) {
            return m.textValue === match;
          });

          if (!matchingOption) {
            return match;
          }

          var entityRange = {
            offset: tempText.indexOf(match),
            length: matchingOption.name.length,
            key: entityCount
          };

          block.entityRanges.forEach(function (range) {
            var thisEnd = entityRange.offset + entityRange.length;
            var otherOffset = range.offset;
            var difference = match.length - matchingOption.name.length;

            if (thisEnd < otherOffset) {
              range.offset -= difference;
            }
          });

          block.entityRanges.push(entityRange);
          raw.entityMap['' + entityCount] = {
            type: functionInfo.trigger + 'mention',
            mutability: 'IMMUTABLE',
            data: {
              mention: (0, _immutable.Map)(matchingOption)
            }
          };

          entityCount += 1;

          // we want to follow along to calculate offsets
          tempText = tempText.replace(match, matchingOption.name);

          return matchingOption.name;
        });

        return { entityCount: entityCount, tempText: tempText };
      });

      this.mentionStateToMarkdownFunctions.push(function (entity) {
        if (entity.getType() !== functionInfo.trigger + 'mention') {
          return false;
        }

        // mentions
        var data = entity.getData();
        return data.mention.get('textValue');
      });

      // set our suggestions
      return this.fixOptions(suggestionProps);
    }

    // added so we can include the stepname in the display

  }, {
    key: 'fixOptions',
    value: function fixOptions(options) {
      var fixOptions = this.props.fixOptions;

      return options.map(fixOptions);
    }
  }, {
    key: '_onInlineClicked',
    value: function _onInlineClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BOLD';
      var editorState = this.state.editorState;

      this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
    }
  }, {
    key: '_onBlockClicked',
    value: function _onBlockClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code-block';
      var editorState = this.state.editorState;

      this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, style));
    }
  }, {
    key: '_onLinkClicked',
    value: function _onLinkClicked(url) {
      var _this4 = this;

      var editorState = this.state.editorState;

      var contentState = editorState.getCurrentContent();
      var selection = editorState.getSelection();
      contentState = contentState.createEntity(_draftJsUtils.ENTITY_TYPE.LINK, 'MUTABLE', {
        url: url
      });
      var entityKey = contentState.getLastCreatedEntityKey();
      var newEditorState = _draftJs.EditorState.push(editorState, contentState);
      // this.setState({ showLinkInput: false });
      this.onChange(_draftJs.RichUtils.toggleLink(newEditorState, selection, entityKey));

      // Hacky: Wait to focus the editor so we don't lose selection.
      setTimeout(function () {
        _this4.onFocus();
      }, 50);
    }
  }, {
    key: '_onUnlinkClicked',
    value: function _onUnlinkClicked() {
      var editorState = this.state.editorState;

      var entity = (0, _getEntityAtCursor3.default)(editorState);
      if (entity != null) {
        var blockKey = entity.blockKey,
            startOffset = entity.startOffset,
            endOffset = entity.endOffset;

        this.onChange((0, _clearEntityForRange2.default)(editorState, blockKey, startOffset, endOffset));
      }
    }
  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        this.onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          disableToolbar = _props2.disableToolbar,
          className = _props2.className,
          onFocus = _props2.onFocus,
          onBlur = _props2.onBlur,
          plainText = _props2.plainText;
      var _state2 = this.state,
          editorState = _state2.editorState,
          suggestions = _state2.suggestions;
      var searchFunctions = this.searchFunctions,
          mentionFunctionInfo = this.mentionFunctionInfo;

      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      var editor = _react2.default.createElement(_draftJsPluginsEditor2.default, {
        editorState: editorState,
        onChange: this.onChange,
        plugins: [].concat(_toConsumableArray(this.mentionPlugins)),
        handleKeyCommand: this.handleKeyCommand,
        placeholder: 'Enter a value...',
        decorators: [_LinkDecorator2.default],
        onFocus: onFocus,
        onBlur: onBlur,
        ref: function ref(e) {
          _this5.editor = e;
        }
      });

      return _react2.default.createElement(
        'div',
        { className: 'editor-input ' + className },
        !disableToolbar && !plainText && _react2.default.createElement(_Toolbar2.default, {
          getEntityAtCursor: this.getEntityAtCursor,
          selection: selection,
          blockType: blockType,
          undoSize: editorState.getUndoStack().size,
          redoSize: editorState.getRedoStack().size,
          onInlineClicked: this._onInlineClicked,
          onBlockClicked: this._onBlockClicked,
          onLinkClicked: this._onLinkClicked,
          onUnlinkClicked: this._onUnlinkClicked,
          onUndoClicked: function onUndoClicked() {
            return _this5.onChange(_draftJs.EditorState.undo(editorState));
          },
          onRedoClicked: function onRedoClicked() {
            return _this5.onChange(_draftJs.EditorState.redo(editorState));
          }
        }),
        !disableToolbar && !plainText ? _react2.default.createElement(
          'div',
          { className: 'template-editor' },
          editor
        ) : editor,
        _react2.default.createElement(
          'div',
          { className: 'mention-suggestions clearFix' },
          this.mentionPlugins.map(function (mentionPlugin, index) {
            var MentionSuggestions = mentionPlugin.MentionSuggestions;


            return _react2.default.createElement(MentionSuggestions, {
              onSearchChange: searchFunctions[index],
              suggestions: suggestions[index] || [],
              entryComponent: _Mention2.default,
              key: mentionFunctionInfo[index].trigger + '_suggestion'
            });
          })
        )
      );
    }
  }]);

  return OurEditor;
}(_react2.default.Component);

OurEditor.propTypes = {
  input: _propTypes2.default.shape().isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  onChange: _propTypes2.default.func,
  disableToolbar: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  fixOptions: _propTypes2.default.func,
  plainText: _propTypes2.default.bool
};

OurEditor.defaultProps = {
  options: [],
  onChange: function onChange() {},
  disableToolbar: false,
  className: '',
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  fixOptions: function fixOptions(o) {
    return _extends({}, o, { attributeName: o.name, name: o.stepName + ' -> ' + o.name });
  },
  plainText: false
};

exports.default = OurEditor;