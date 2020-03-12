"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Editor = _interopRequireDefault(require("../MarkdownInput/Editor"));

require("./FormulaEditor.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// const TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
// const OPTION_MENTION_INDEX = 0;
var FORMULA_REGEX = /\$(\S*-*)([0-9a-zA-Z-]+)\$/g;
var FORMULA_MENTION_INDEX = 1;
var ATTRIBUTE_REGEX = /#(\S*-*)([0-9a-zA-Z-]+)#/g;
var ATTRIBUTE_MENTION_INDEX = 2;

var FormulaEditor = /*#__PURE__*/function (_OurEditor) {
  _inherits(FormulaEditor, _OurEditor);

  function FormulaEditor() {
    _classCallCheck(this, FormulaEditor);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormulaEditor).apply(this, arguments));
  }

  _createClass(FormulaEditor, [{
    key: "extraMentions",
    // eslint-disable-next-line class-methods-use-this
    value: function extraMentions() {
      return [{
        regex: FORMULA_REGEX,
        index: FORMULA_MENTION_INDEX,
        trigger: '$',
        suggestionProp: 'formulas',
        theme: {
          mention: 'mention-formula'
        }
      }, {
        regex: ATTRIBUTE_REGEX,
        index: ATTRIBUTE_MENTION_INDEX,
        trigger: '#',
        suggestionProp: 'attributes',
        theme: {
          mention: 'mention-attribute'
        }
      }];
    }
  }]);

  return FormulaEditor;
}(_Editor["default"]);

var _default = FormulaEditor;
exports["default"] = _default;