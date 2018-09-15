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

var _clearEntityForRange = require('./clearEntityForRange');

var _clearEntityForRange2 = _interopRequireDefault(_clearEntityForRange);

require('./Editor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEMPLATE_REGEX = /{(\S*-*)([0-9a-zA-Z-]+)}/g;
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

    _this.state.editorState = props && props.input && props.input.value && props.input.value.length ? _this.getStateFromMarkdown(props.input.value, props.options) : _draftJs.EditorState.createEmpty();

    _this.mentionFunctionInfo = [];
    _this.mentionPlugins = [];
    _this.searchFunctions = [];
    _this.mentionStateFromMarkdownFunctions = [];
    _this.mentionStateToMarkdownFunctions = [];

    _this.addMentionPlugin({
      regex: TEMPLATE_REGEX,
      index: OPTION_MENTION_INDEX,
      trigger: '{',
      suggestionProp: 'options'
    });

    _this.mentionRef = null;

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

      var hasValue = input && input.value && input.value.length;
      var newSuggestions = [].concat(_toConsumableArray(this.state.suggestions));

      // set our normal suggestions
      newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(options);

      this.setState({ suggestions: newSuggestions }, function () {
        if (hasValue) {
          _this2.onChange(_draftJs.EditorState.push(_this2.state.editorState, _this2.getStateFromMarkdown(input.value, options).getCurrentContent()));
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var input = nextProps.input;

      var hasValue = input && input.value && input.value.length;
      var newSuggestions = [].concat(_toConsumableArray(this.state.suggestions));

      // set our normal suggestions
      newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(nextProps.options);

      // update our options list
      if (this.props.options.length !== nextProps.options.length) {
        this.setState({ suggestions: newSuggestions }, function () {
          if (hasValue) {
            _this3.onChange(_draftJs.EditorState.push(_this3.state.editorState, _this3.getStateFromMarkdown(input.value).getCurrentContent()));
          }
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var editorState = this.state.editorState;

      var md = this.getStateToMarkdown(editorState);
      // update the value if needed
      if (md !== this.props.input.value) {
        this.onChange(_draftJs.EditorState.push(this.state.editorState, this.getStateFromMarkdown(this.props.input.value).getCurrentContent()));
      }
    }

    /**
     * Runs when the editor value is changed by the user (usually typing)
     */

  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      var md = this.getStateToMarkdown(editorState);

      // console.log(JSON.stringify(editorState.getCurrentContent(), null, 2));

      this.props.input.onChange(md);
      this.setState({ editorState: editorState });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.editor.focus();
    }
  }, {
    key: 'getStateFromMarkdown',
    value: function getStateFromMarkdown(value) {
      return _draftJs.EditorState.createWithContent((0, _stateFromMarkdown2.default)(value, this.state.suggestions, this.mentionStateFromMarkdownFunctions), new _MultiDecorator2.default([new _draftJs.CompositeDecorator([_LinkDecorator2.default])]));
    }
  }, {
    key: 'getStateToMarkdown',
    value: function getStateToMarkdown(editorState) {
      var plainText = this.props.plainText;


      if (plainText) {
        return (0, _stateToPlainText2.default)(editorState.getCurrentContent(), this.mentionStateFromMarkdownFunctions);
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
      var _this4 = this;

      var nSuggestions = [].concat(_toConsumableArray(this.state.suggestions));

      // set our normal suggestions
      nSuggestions[functionInfo.index] = this.fixOptions(this.props[functionInfo.suggestionProp]);
      this.state.suggestions = nSuggestions;

      this.mentionFunctionInfo.push(functionInfo);

      this.mentionPlugins.push((0, _draftJsMentionPlugin2.default)({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: functionInfo.trigger,
        theme: _extends({}, _draftJsMentionPlugin.defaultTheme, functionInfo.theme)
        // supportWhitespace: true,
      }));

      this.searchFunctions.push(function (_ref) {
        var value = _ref.value;

        var newSuggestions = [].concat(_toConsumableArray(_this4.state.suggestions));

        // set our normal suggestions
        newSuggestions[functionInfo.index] = (0, _suggestionsFilter2.default)(value, _this4.fixOptions(_this4.props[functionInfo.suggestionProp]));

        _this4.setState({ suggestions: newSuggestions });
      });

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

          console.log(tempText);
          var entityRange = {
            offset: tempText.indexOf(match),
            length: matchingOption.name.length,
            key: entityCount
          };

          block.entityRanges.forEach(function (range) {
            var thisEnd = entityRange.offset + entityRange.length;
            var otherOffset = range.offset;
            var difference = match.length - matchingOption.name.length;
            console.log({
              thisOffset: entityRange.offset,
              thisEnd: thisEnd,
              otherOffset: otherOffset,
              difference: difference
            });

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
    }

    // added so we can include the stepname in the display

  }, {
    key: 'fixOptions',
    value: function fixOptions(options) {
      return options.map(this.props.fixOptions);
    }
  }, {
    key: '_onInlineClicked',
    value: function _onInlineClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BOLD';

      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, style));
    }
  }, {
    key: '_onBlockClicked',
    value: function _onBlockClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code-block';

      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, style));
    }
  }, {
    key: '_onLinkClicked',
    value: function _onLinkClicked(url) {
      var _this5 = this;

      var editorState = this.state.editorState;

      var contentState = editorState.getCurrentContent();
      var selection = editorState.getSelection();
      contentState = contentState.createEntity(_draftJsUtils.ENTITY_TYPE.LINK, 'MUTABLE', {
        url: url
      });
      var entityKey = contentState.getLastCreatedEntityKey();
      var newEditorState = _draftJs.EditorState.push(editorState, contentState);
      this.setState({ showLinkInput: false });
      this.onChange(_draftJs.RichUtils.toggleLink(newEditorState, selection, entityKey));

      // Hacky: Wait to focus the editor so we don't lose selection.
      setTimeout(function () {
        _this5.onFocus();
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
      var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);

      if (newState) {
        this.onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props2 = this.props,
          disableToolbar = _props2.disableToolbar,
          className = _props2.className,
          onFocus = _props2.onFocus,
          onBlur = _props2.onBlur,
          plainText = _props2.plainText;
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      var editor = _react2.default.createElement(_draftJsPluginsEditor2.default, {
        editorState: this.state.editorState,
        onChange: this.onChange,
        plugins: [].concat(_toConsumableArray(this.mentionPlugins)),
        handleKeyCommand: this.handleKeyCommand,
        placeholder: 'Enter a value...',
        decorators: [_LinkDecorator2.default],
        onFocus: onFocus,
        onBlur: onBlur,
        ref: function ref(e) {
          _this6.editor = e;
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
            return _this6.onChange(_draftJs.EditorState.undo(editorState));
          },
          onRedoClicked: function onRedoClicked() {
            return _this6.onChange(_draftJs.EditorState.redo(editorState));
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
              onSearchChange: _this6.searchFunctions[index],
              suggestions: _this6.state.suggestions[index] || [],
              entryComponent: _Mention2.default,
              key: _this6.mentionFunctionInfo[index].trigger + '_suggestion'
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