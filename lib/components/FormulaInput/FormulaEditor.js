'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Editor = require('../MarkdownInput/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

require('./FormulaEditor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FORMULA_REGEX = /\$(\S*-*)([0-9a-zA-Z-]+)\$/g;
var FORMULA_MENTION_INDEX = 1;

var ATTRIBUTE_REGEX = /#(\S*-*)([0-9a-zA-Z-]+)#/g;
var ATTRIBUTE_MENTION_INDEX = 2;

var FormulaEditor = function (_OurEditor) {
  _inherits(FormulaEditor, _OurEditor);

  function FormulaEditor(props) {
    _classCallCheck(this, FormulaEditor);

    var _this = _possibleConstructorReturn(this, (FormulaEditor.__proto__ || Object.getPrototypeOf(FormulaEditor)).call(this, props));

    _this.addMentionPlugin({
      regex: FORMULA_REGEX,
      index: FORMULA_MENTION_INDEX,
      trigger: '$',
      suggestionProp: 'formulas',
      theme: {
        mention: 'mention-formula'
      }
    });

    _this.addMentionPlugin({
      regex: ATTRIBUTE_REGEX,
      index: ATTRIBUTE_MENTION_INDEX,
      trigger: '#',
      suggestionProp: 'attributes',
      theme: {
        mention: 'mention-attribute'
      }
    });
    return _this;
  }

  return FormulaEditor;
}(_Editor2.default);

exports.default = FormulaEditor;