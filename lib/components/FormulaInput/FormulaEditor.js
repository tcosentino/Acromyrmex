'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Editor = require('../MarkdownInput/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

require('./FormulaEditor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
// const OPTION_MENTION_INDEX = 0;

var FORMULA_REGEX = /\$(\S*-*)([0-9a-zA-Z-]+)\$/g;
var FORMULA_MENTION_INDEX = 1;

var ATTRIBUTE_REGEX = /#(\S*-*)([0-9a-zA-Z-]+)#/g;
var ATTRIBUTE_MENTION_INDEX = 2;

var FormulaEditor = function (_OurEditor) {
  _inherits(FormulaEditor, _OurEditor);

  function FormulaEditor() {
    _classCallCheck(this, FormulaEditor);

    return _possibleConstructorReturn(this, (FormulaEditor.__proto__ || Object.getPrototypeOf(FormulaEditor)).apply(this, arguments));
  }

  _createClass(FormulaEditor, [{
    key: 'extraMentions',
    value: function extraMentions() {
      this.addMentionPlugin({
        regex: FORMULA_REGEX,
        index: FORMULA_MENTION_INDEX,
        trigger: '$',
        suggestionProp: 'formulas',
        theme: {
          mention: 'mention-formula'
        }
      });

      this.addMentionPlugin({
        regex: ATTRIBUTE_REGEX,
        index: ATTRIBUTE_MENTION_INDEX,
        trigger: '#',
        suggestionProp: 'attributes',
        theme: {
          mention: 'mention-attribute'
        }
      });
    }
  }]);

  return FormulaEditor;
}(_Editor2.default);

exports.default = FormulaEditor;