'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UiComponents = require('../../../utility/UiComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class ConfirmModal extends React.Component {
// render() {
var ConfirmModal = function ConfirmModal(props) {
  var onCancel = props.onCancel,
      onConfirm = props.onConfirm,
      title = props.title,
      message = props.message,
      show = props.show;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _UiComponents.Modal,
      { show: show, onHide: onCancel, className: 'image-preview', bsSize: 'large' },
      _react2.default.createElement(
        _UiComponents.Modal.Header,
        { closeButton: true },
        _react2.default.createElement(
          _UiComponents.Modal.Title,
          null,
          title || 'Confirm?'
        )
      ),
      _react2.default.createElement(
        _UiComponents.Modal.Body,
        null,
        message || 'Are you sure?'
      ),
      _react2.default.createElement(
        _UiComponents.Modal.Footer,
        null,
        _react2.default.createElement(
          _UiComponents.Button,
          { bsStyle: 'danger', onClick: onCancel },
          'Cancel'
        ),
        _react2.default.createElement(
          _UiComponents.Button,
          { bsStyle: 'success', onClick: onConfirm },
          'Confirm'
        )
      )
    )
  );
};

// Define property types
ConfirmModal.propTypes = {
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  onCancel: _propTypes2.default.func,
  onConfirm: _propTypes2.default.func
};

ConfirmModal.defaultProps = {
  title: null,
  message: null,
  show: false,
  onCancel: function onCancel() {},
  onConfirm: function onConfirm() {}
};

exports.default = ConfirmModal;