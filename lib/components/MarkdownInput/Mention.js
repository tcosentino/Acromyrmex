"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Mention = function Mention(props) {
  var mention = props.mention,
      parentProps = _objectWithoutProperties(props, ["mention"]); // we don't want to pass some of these, but are not currently using them


  var transferProps = _objectSpread({}, parentProps);

  delete transferProps.theme;
  delete transferProps.isFocused;
  delete transferProps.searchValue;

  if (!mention.get) {
    mention.get = function get(key) {
      // eslint-disable-next-line react/no-this-in-sfc
      return this[key];
    };
  }

  return _react["default"].createElement("div", transferProps, _react["default"].createElement("div", {
    className: "mention"
  }, _react["default"].createElement("div", {
    className: "mention-thumb"
  }, mention.get('stepNumber')), _react["default"].createElement("div", {
    className: "mention-info"
  }, _react["default"].createElement("div", {
    className: "mention-header"
  }, mention.get('name')), _react["default"].createElement("div", {
    className: "mention-detail"
  }, mention.get('stepName')))));
};

Mention.propTypes = {
  mention: _propTypes["default"].shape().isRequired
};
var _default = Mention;
exports["default"] = _default;