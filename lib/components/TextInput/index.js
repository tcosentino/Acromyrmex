"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

var _FormField = _interopRequireDefault(require("../FormField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TextInput = function TextInput(props) {
  var help = props.help,
      label = props.label,
      prefix = props.prefix,
      noLabel = props.noLabel,
      vertical = props.vertical,
      autoFocus = props.autoFocus,
      onPaste = props.onPaste,
      addonAfter = props.addonAfter,
      addonBefore = props.addonBefore,
      addonCustomBefore = props.addonCustomBefore,
      addonCustomAfter = props.addonCustomAfter,
      inputProps = _extends({}, props.input),
      meta = props.meta,
      disabled = props.disabled,
      maxCols = props.maxCols;

  var type = props.type; // alias

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
  }, _react["default"].createElement(_UiComponents.FormControl, _extends({
    type: type,
    disabled: disabled,
    autoFocus: autoFocus // bsSize="small"

  }, inputProps, {
    onPaste: onPaste,
    onDrop: function onDrop(e) {
      if (e.dataTransfer.files.length) {
        inputProps.onDrop(e);
      }
    }
  })));
};

TextInput.shouldComponentUpdate = _FormField["default"].shouldFormFieldUpdate;
TextInput.propTypes = {
  meta: _propTypes["default"].shape().isRequired,
  vertical: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  type: _propTypes["default"].string,
  prefix: _propTypes["default"].node,
  input: _propTypes["default"].shape().isRequired,
  noLabel: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  addonAfter: _propTypes["default"].string,
  addonBefore: _propTypes["default"].string,
  addonCustomAfter: _propTypes["default"].node,
  addonCustomBefore: _propTypes["default"].node,
  onPaste: _propTypes["default"].func,
  maxCols: _propTypes["default"].number
};
TextInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  help: '',
  label: '',
  vertical: false,
  type: 'text',
  onPaste: function onPaste() {},
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12
};
var _default = TextInput;
exports["default"] = _default;