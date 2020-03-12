"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Icon = function Icon(props) {
  var edit = props.edit,
      help = props.help,
      close = props.close,
      filter = props.filter,
      info = props.info,
      remove = props.remove,
      upload = props.upload,
      download = props.download,
      drag = props.drag,
      cart = props.cart;
  var className = (0, _classnames["default"])('fa', {
    'fa-edit': edit,
    'fa-question-circle': help,
    'fa-close': close,
    'fa-filter': filter,
    'fa-trash': remove,
    'fa-upload': upload,
    'fa-download': download,
    'fa-info-circle': info,
    'fa-bars': drag,
    'fa-shopping-cart': cart
  });
  return _react["default"].createElement("i", {
    className: className
  });
};

Icon.propTypes = {
  edit: _propTypes["default"].bool,
  help: _propTypes["default"].bool,
  info: _propTypes["default"].bool,
  close: _propTypes["default"].bool,
  filter: _propTypes["default"].bool,
  remove: _propTypes["default"].bool,
  upload: _propTypes["default"].bool,
  download: _propTypes["default"].bool,
  drag: _propTypes["default"].bool,
  cart: _propTypes["default"].bool
};
Icon.defaultProps = {
  edit: false,
  help: false,
  info: false,
  close: false,
  filter: false,
  remove: false,
  upload: false,
  download: false,
  drag: false,
  cart: false
};
var _default = Icon;
exports["default"] = _default;