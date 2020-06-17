"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _draftJsPluginsEditor = _interopRequireDefault(require("draft-js-plugins-editor"));

var _draftJs = require("draft-js");

var _draftJsMentionPlugin = _interopRequireWildcard(require("draft-js-mention-plugin"));

var _draftJsUtils = require("draft-js-utils");

var _MultiDecorator = _interopRequireDefault(require("draft-js-plugins-editor/lib/Editor/MultiDecorator"));

require("draft-js/dist/Draft.css");

require("draft-js-mention-plugin/lib/plugin.css");

var _suggestionsFilter = _interopRequireDefault(require("./suggestionsFilter"));

var _Mention = _interopRequireDefault(require("./Mention"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _getEntityAtCursor2 = _interopRequireDefault(require("./getEntityAtCursor"));

var _LinkDecorator = _interopRequireDefault(require("./LinkDecorator"));

var _stateToMarkdown = _interopRequireDefault(require("./stateToMarkdown"));

var _stateToPlainText = _interopRequireDefault(require("./stateToPlainText"));

var _stateFromMarkdown = _interopRequireDefault(require("./stateFromMarkdown"));

var _stateFromPlainText = _interopRequireDefault(require("./stateFromPlainText"));

var _clearEntityForRange = _interopRequireDefault(require("./clearEntityForRange"));

require("./Editor.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
var OPTION_MENTION_INDEX = 0;

var OurEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(OurEditor, _React$Component);

  function OurEditor(props) {
    var _this;

    _classCallCheck(this, OurEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OurEditor).call(this, props));
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
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this._onInlineClicked = _this._onInlineClicked.bind(_assertThisInitialized(_this));
    _this._onBlockClicked = _this._onBlockClicked.bind(_assertThisInitialized(_this));
    _this._onLinkClicked = _this._onLinkClicked.bind(_assertThisInitialized(_this));
    _this._onUnlinkClicked = _this._onUnlinkClicked.bind(_assertThisInitialized(_this));
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_assertThisInitialized(_this));
    _this.getEntityAtCursor = _this.getEntityAtCursor.bind(_assertThisInitialized(_this));

    _this.startMentions();

    return _this;
  } // eslint-disable-next-line camelcase


  _createClass(OurEditor, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var input = nextProps.input;
      var options = this.props.options;
      var _this$state = this.state,
          suggestions = _this$state.suggestions,
          editorState = _this$state.editorState;
      var hasValue = input && input.value && input.value.length;

      var newSuggestions = _toConsumableArray(suggestions); // set our normal suggestions


      newSuggestions[OPTION_MENTION_INDEX] = this.fixOptions(nextProps.options); // update our options list

      if (options.length !== nextProps.options.length) {
        this.setState({
          suggestions: newSuggestions
        }, function () {
          if (hasValue) {
            _this2.onChange(_draftJs.EditorState.push(editorState, _this2.getStateFromMarkdown(input.value).getCurrentContent()));
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var value = this.props.input.value;
      var editorState = this.state.editorState;
      var md = this.getStateToMarkdown(editorState); // update the value if needed

      if (md !== value) {
        this.onChange(_draftJs.EditorState.push(editorState, this.getStateFromMarkdown(value).getCurrentContent()));
      }
    }
    /**
     * Runs when the editor value is changed by the user (usually typing)
     */

  }, {
    key: "onChange",
    value: function onChange(editorState) {
      var onChange = this.props.input.onChange;
      var md = this.getStateToMarkdown(editorState);
      onChange(md);
      this.setState({
        editorState: editorState
      });
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.editor.focus();
    }
  }, {
    key: "onSuggestionSearch",
    value: function onSuggestionSearch(functionInfo, _ref) {
      var value = _ref.value;
      var suggestionProps = this.props[functionInfo.suggestionProp];
      var suggestions = this.state.suggestions;

      var newSuggestions = _toConsumableArray(suggestions); // set our normal suggestions


      newSuggestions[functionInfo.index] = (0, _suggestionsFilter["default"])(value, this.fixOptions(suggestionProps));
      this.setState({
        suggestions: newSuggestions
      });
    }
  }, {
    key: "getStateFromMarkdown",
    value: function getStateFromMarkdown(value) {
      var plainText = this.props.plainText;
      var suggestions = this.state.suggestions;
      return _draftJs.EditorState.createWithContent(plainText ? (0, _stateFromPlainText["default"])(value, suggestions, this.mentionStateFromMarkdownFunctions) : (0, _stateFromMarkdown["default"])(value, suggestions, this.mentionStateFromMarkdownFunctions), new _MultiDecorator["default"]([new _draftJs.CompositeDecorator([_LinkDecorator["default"]])]));
    }
  }, {
    key: "getStateToMarkdown",
    value: function getStateToMarkdown(editorState) {
      var plainText = this.props.plainText;

      if (plainText) {
        return (0, _stateToPlainText["default"])(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
      }

      return (0, _stateToMarkdown["default"])(editorState.getCurrentContent(), this.mentionStateToMarkdownFunctions);
    }
  }, {
    key: "getEntityAtCursor",
    value: function getEntityAtCursor() {
      var editorState = this.state.editorState;
      var contentState = editorState.getCurrentContent();
      var entity = (0, _getEntityAtCursor2["default"])(editorState);
      return entity == null ? null : contentState.getEntity(entity.entityKey);
    }
  }, {
    key: "startMentions",
    value: function startMentions() {
      var _this3 = this;

      var _this$props = this.props,
          input = _this$props.input,
          options = _this$props.options;
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
          mentions[extraMention.index] = _this3.addMentionPlugin(extraMention);
        });
      } // since this is called from the constructor we just set state directly


      this.state.suggestions = mentions;

      if (hasValue) {
        var newState = _draftJs.EditorState.push(editorState, this.getStateFromMarkdown(input.value, options).getCurrentContent());

        var md = this.getStateToMarkdown(newState);
        input.onChange(md);
        this.state.editorState = newState;
      }
    }
  }, {
    key: "addMentionPlugin",
    value: function addMentionPlugin(functionInfo) {
      var suggestionProps = this.props[functionInfo.suggestionProp];
      this.mentionFunctionInfo.push(functionInfo);
      this.mentionPlugins.push((0, _draftJsMentionPlugin["default"])({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: functionInfo.trigger,
        theme: _objectSpread({}, _draftJsMentionPlugin.defaultTheme, {}, functionInfo.theme) // supportWhitespace: true,

      }));
      this.searchFunctions.push(this.onSuggestionSearch.bind(this, functionInfo));
      this.mentionStateFromMarkdownFunctions.push(function (raw, entityCount, block, mentions, tempText) {
        var text = block.text; // Loop over the matches

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
          raw.entityMap["".concat(entityCount)] = {
            type: "".concat(functionInfo.trigger, "mention"),
            mutability: 'IMMUTABLE',
            data: {
              mention: (0, _immutable.Map)(matchingOption)
            }
          };
          entityCount += 1; // we want to follow along to calculate offsets

          tempText = tempText.replace(match, matchingOption.name);
          return matchingOption.name;
        });
        return {
          entityCount: entityCount,
          tempText: tempText
        };
      });
      this.mentionStateToMarkdownFunctions.push(function (entity) {
        if (entity.getType() !== "".concat(functionInfo.trigger, "mention")) {
          return false;
        } // mentions


        var data = entity.getData();
        return data.mention.get('textValue');
      }); // set our suggestions

      return this.fixOptions(suggestionProps);
    } // added so we can include the stepname in the display

  }, {
    key: "fixOptions",
    value: function fixOptions(options) {
      var fixOptions = this.props.fixOptions;
      return options.map(fixOptions);
    }
  }, {
    key: "_onInlineClicked",
    value: function _onInlineClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BOLD';
      var editorState = this.state.editorState;
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
    }
  }, {
    key: "_onBlockClicked",
    value: function _onBlockClicked() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code-block';
      var editorState = this.state.editorState;
      this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, style));
    }
  }, {
    key: "_onLinkClicked",
    value: function _onLinkClicked(url) {
      var _this4 = this;

      var editorState = this.state.editorState;
      var contentState = editorState.getCurrentContent();
      var selection = editorState.getSelection();
      contentState = contentState.createEntity(_draftJsUtils.ENTITY_TYPE.LINK, 'MUTABLE', {
        url: url
      });
      var entityKey = contentState.getLastCreatedEntityKey();

      var newEditorState = _draftJs.EditorState.push(editorState, contentState); // this.setState({ showLinkInput: false });


      this.onChange(_draftJs.RichUtils.toggleLink(newEditorState, selection, entityKey)); // Hacky: Wait to focus the editor so we don't lose selection.

      setTimeout(function () {
        _this4.onFocus();
      }, 50);
    }
  }, {
    key: "_onUnlinkClicked",
    value: function _onUnlinkClicked() {
      var editorState = this.state.editorState;
      var entity = (0, _getEntityAtCursor2["default"])(editorState);

      if (entity != null) {
        var blockKey = entity.blockKey,
            startOffset = entity.startOffset,
            endOffset = entity.endOffset;
        this.onChange((0, _clearEntityForRange["default"])(editorState, blockKey, startOffset, endOffset));
      }
    }
  }, {
    key: "handleKeyCommand",
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
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props2 = this.props,
          disableToolbar = _this$props2.disableToolbar,
          className = _this$props2.className,
          onFocus = _this$props2.onFocus,
          onBlur = _this$props2.onBlur,
          plainText = _this$props2.plainText;
      var _this$state2 = this.state,
          editorState = _this$state2.editorState,
          suggestions = _this$state2.suggestions;
      var searchFunctions = this.searchFunctions,
          mentionFunctionInfo = this.mentionFunctionInfo;
      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      var editor = _react["default"].createElement(_draftJsPluginsEditor["default"], {
        editorState: editorState,
        onChange: this.onChange,
        plugins: _toConsumableArray(this.mentionPlugins),
        handleKeyCommand: this.handleKeyCommand,
        placeholder: "Enter a value...",
        decorators: [_LinkDecorator["default"]],
        onFocus: onFocus,
        onBlur: onBlur,
        ref: function ref(e) {
          _this5.editor = e;
        }
      });

      return _react["default"].createElement("div", {
        className: "editor-input ".concat(className)
      }, !disableToolbar && !plainText && _react["default"].createElement(_Toolbar["default"], {
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
      }), !disableToolbar && !plainText ? _react["default"].createElement("div", {
        className: "template-editor"
      }, editor) : editor, _react["default"].createElement("div", {
        className: "mention-suggestions clearFix"
      }, this.mentionPlugins.map(function (mentionPlugin, index) {
        var MentionSuggestions = mentionPlugin.MentionSuggestions;
        return _react["default"].createElement(MentionSuggestions, {
          onSearchChange: searchFunctions[index],
          suggestions: suggestions[index] || [],
          entryComponent: _Mention["default"],
          key: "".concat(mentionFunctionInfo[index].trigger, "_suggestion")
        });
      })));
    }
  }]);

  return OurEditor;
}(_react["default"].Component);

OurEditor.propTypes = {
  input: _propTypes["default"].shape().isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  onChange: _propTypes["default"].func,
  disableToolbar: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  fixOptions: _propTypes["default"].func,
  plainText: _propTypes["default"].bool
};
OurEditor.defaultProps = {
  options: [],
  onChange: function onChange() {},
  disableToolbar: false,
  className: '',
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  fixOptions: function fixOptions(o) {
    return _objectSpread({}, o, {
      attributeName: o.name,
      name: "".concat(o.stepName, " -> ").concat(o.name)
    });
  },
  plainText: false
};
var _default = OurEditor;
exports["default"] = _default;