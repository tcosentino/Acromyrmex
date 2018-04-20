'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


  var className = (0, _classnames2.default)('fa', {
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

  return _react2.default.createElement('i', { className: className });
};

Icon.propTypes = {
  edit: _propTypes2.default.bool,
  help: _propTypes2.default.bool,
  info: _propTypes2.default.bool,
  close: _propTypes2.default.bool,
  filter: _propTypes2.default.bool,
  remove: _propTypes2.default.bool,
  upload: _propTypes2.default.bool,
  download: _propTypes2.default.bool,
  drag: _propTypes2.default.bool,
  cart: _propTypes2.default.bool
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

exports.default = Icon;