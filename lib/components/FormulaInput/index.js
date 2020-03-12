"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

var _FormField = _interopRequireDefault(require("../FormField"));

var _FormulaEditor = _interopRequireDefault(require("./FormulaEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormulaInput = /*#__PURE__*/function (_React$Component) {
  _inherits(FormulaInput, _React$Component);

  function FormulaInput(props) {
    var _this;

    _classCallCheck(this, FormulaInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormulaInput).call(this, props));
    _this.state = {
      focused: false
    };
    _this.renderOption = _this.renderOption.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormulaInput, [{
    key: "renderOption",
    value: function renderOption(option) {
      var onTemplateClicked = this.props.onTemplateClicked;
      return _react["default"].createElement(_UiComponents.Col, {
        xs: 12,
        key: option.name,
        className: "template-option",
        onClick: function onClick() {
          onTemplateClicked(option);
        }
      }, option.name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          help = _this$props.help,
          label = _this$props.label,
          prefix = _this$props.prefix,
          noLabel = _this$props.noLabel,
          vertical = _this$props.vertical,
          options = _this$props.options,
          addonAfter = _this$props.addonAfter,
          addonBefore = _this$props.addonBefore,
          addonCustomBefore = _this$props.addonCustomBefore,
          addonCustomAfter = _this$props.addonCustomAfter,
          attributes = _this$props.attributes,
          formulas = _this$props.formulas,
          inputProps = _extends({}, _this$props.input),
          meta = _this$props.meta,
          maxCols = _this$props.maxCols;

      var type = this.props.type;
      var focused = this.state.focused; // alias

      if (type === 'datetime') {
        type = 'datetime-local';
      }

      return _react["default"].createElement(_FormField["default"], {
        label: label,
        prefix: prefix,
        meta: meta,
        help: help,
        vertical: vertical,
        noLabel: noLabel,
        maxCols: maxCols,
        addonAfter: addonAfter,
        addonBefore: addonBefore,
        addonCustomAfter: addonCustomAfter,
        addonCustomBefore: addonCustomBefore
      }, _react["default"].createElement(_FormulaEditor["default"], {
        options: options,
        attributes: attributes,
        formulas: formulas,
        disableToolbar: true,
        input: inputProps,
        className: "template-input",
        fixOptions: function fixOptions(o) {
          return _objectSpread({}, o);
        },
        onFocus: function onFocus() {
          _this2.setState({
            focused: true
          });
        },
        onBlur: function onBlur() {
          _this2.setState({
            focused: false
          });
        }
      }), (focused || false) && options.length > 0 && _react["default"].createElement(_UiComponents.HelpBlock, null, _react["default"].createElement("span", {
        className: "mention-formula display-only"
      }, "$ Formula"), " |", ' ', _react["default"].createElement("span", {
        className: "mention-attribute display-only"
      }, "# Attribute"), " |", ' ', _react["default"].createElement("span", {
        className: "mention-data display-only"
      }, '{', " Data")));
    }
  }]);

  return FormulaInput;
}(_react["default"].Component);

FormulaInput.shouldComponentUpdate = _FormField["default"].shouldFormFieldUpdate;
FormulaInput.propTypes = {
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  // data
  formulas: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  // formulas (COUNT, SUM)
  attributes: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  // attributes that can be used
  meta: _propTypes["default"].shape().isRequired,
  onTemplateClicked: _propTypes["default"].func,
  vertical: _propTypes["default"].bool,
  // autoFocus: PropTypes.bool,
  help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  type: _propTypes["default"].string,
  prefix: _propTypes["default"].node,
  input: _propTypes["default"].shape().isRequired,
  noLabel: _propTypes["default"].bool,
  // disabled: PropTypes.bool,
  addonAfter: _propTypes["default"].string,
  addonBefore: _propTypes["default"].string,
  addonCustomAfter: _propTypes["default"].node,
  addonCustomBefore: _propTypes["default"].node,
  maxCols: _propTypes["default"].number
};
FormulaInput.defaultProps = {
  onTemplateClicked: function onTemplateClicked() {},
  help: '',
  options: [],
  formulas: [],
  attributes: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12
};
var _default = FormulaInput;
exports["default"] = _default;