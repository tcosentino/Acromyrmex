"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

var _Loading = _interopRequireDefault(require("../Loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var LoadingButton = function LoadingButton(props) {
  var icon = props.icon,
      label = props.label,
      loading = props.loading,
      disabled = props.disabled,
      loadingLabel = props.loadingLabel,
      btnProps = _objectWithoutProperties(props, ["icon", "label", "loading", "disabled", "loadingLabel"]);

  return _react["default"].createElement(_UiComponents.Button, _extends({
    disabled: loading || disabled
  }, btnProps), loading ? _react["default"].createElement("span", null, _react["default"].createElement(_Loading["default"], {
    inline: true,
    delay: false
  }), icon && _react["default"].createElement("img", {
    src: icon,
    alt: "...",
    className: "LoadingButton__icon"
  }), loadingLabel || "".concat(label, "ing"), "\u2026") : _react["default"].createElement("span", null, icon && _react["default"].createElement("img", {
    src: icon,
    alt: "...",
    className: "LoadingButton__icon"
  }), label));
};

LoadingButton.propTypes = {
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]).isRequired,
  loading: _propTypes["default"].bool.isRequired,
  disabled: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  // Defaults to label + 'ing' if not provided
  loadingLabel: _propTypes["default"].string
};
LoadingButton.defaultProps = {
  icon: false,
  disabled: false,
  loadingLabel: ''
};
var _default = LoadingButton;
exports["default"] = _default;