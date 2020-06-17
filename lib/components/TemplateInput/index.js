"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

var _FormField = _interopRequireDefault(require("../FormField"));

var _Editor = _interopRequireDefault(require("../MarkdownInput/Editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TemplateInput = /*#__PURE__*/function (_React$Component) {
  _inherits(TemplateInput, _React$Component);

  function TemplateInput(props) {
    var _this;

    _classCallCheck(this, TemplateInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TemplateInput).call(this, props));
    _this.state = {
      focused: false
    };
    _this.renderOption = _this.renderOption.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TemplateInput, [{
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
          inputProps = _extends({}, _this$props.input),
          meta = _this$props.meta,
          fixOptions = _this$props.fixOptions,
          maxCols = _this$props.maxCols,
          plainText = _this$props.plainText;

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
      }, _react["default"].createElement(_Editor["default"], {
        options: options,
        disableToolbar: true,
        input: inputProps,
        className: "template-input",
        fixOptions: fixOptions,
        onFocus: function onFocus() {
          _this2.setState({
            focused: true
          });
        },
        onBlur: function onBlur() {
          _this2.setState({
            focused: false
          });
        },
        plainText: plainText
      }), (focused || false) && options.length > 0 && _react["default"].createElement(_UiComponents.HelpBlock, null, "Press '{' to add data from previous steps."));
    }
  }]);

  return TemplateInput;
}(_react["default"].Component);

TemplateInput.shouldComponentUpdate = _FormField["default"].shouldFormFieldUpdate;
TemplateInput.propTypes = {
  meta: _propTypes["default"].shape().isRequired,
  onTemplateClicked: _propTypes["default"].func,
  vertical: _propTypes["default"].bool,
  // autoFocus: PropTypes.bool,
  help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  type: _propTypes["default"].string,
  prefix: _propTypes["default"].node,
  input: _propTypes["default"].shape().isRequired,
  noLabel: _propTypes["default"].bool,
  // disabled: PropTypes.bool,
  addonAfter: _propTypes["default"].string,
  addonBefore: _propTypes["default"].string,
  addonCustomAfter: _propTypes["default"].node,
  addonCustomBefore: _propTypes["default"].node,
  maxCols: _propTypes["default"].number,
  fixOptions: _propTypes["default"].func,
  plainText: _propTypes["default"].bool
};
TemplateInput.defaultProps = {
  onTemplateClicked: function onTemplateClicked() {},
  help: '',
  options: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12,
  fixOptions: undefined,
  plainText: false
};
var _default = TemplateInput;
exports["default"] = _default;