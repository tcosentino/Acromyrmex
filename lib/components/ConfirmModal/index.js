"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// class ConfirmModal extends React.Component {
// render() {
var ConfirmModal = function ConfirmModal(props) {
  var onCancel = props.onCancel,
      onConfirm = props.onConfirm,
      title = props.title,
      message = props.message,
      show = props.show;
  return _react["default"].createElement("div", null, _react["default"].createElement(_UiComponents.Modal, {
    show: show,
    onHide: onCancel,
    className: "image-preview",
    bsSize: "large"
  }, _react["default"].createElement(_UiComponents.Modal.Header, {
    closeButton: true
  }, _react["default"].createElement(_UiComponents.Modal.Title, null, title || 'Confirm?')), _react["default"].createElement(_UiComponents.Modal.Body, null, message || 'Are you sure?'), _react["default"].createElement(_UiComponents.Modal.Footer, null, _react["default"].createElement(_UiComponents.Button, {
    bsStyle: "danger",
    onClick: onCancel
  }, "Cancel"), _react["default"].createElement(_UiComponents.Button, {
    bsStyle: "success",
    onClick: onConfirm
  }, "Confirm"))));
}; // Define property types


ConfirmModal.propTypes = {
  title: _propTypes["default"].string,
  message: _propTypes["default"].string,
  show: _propTypes["default"].bool,
  onCancel: _propTypes["default"].func,
  onConfirm: _propTypes["default"].func
};
ConfirmModal.defaultProps = {
  title: null,
  message: null,
  show: false,
  onCancel: function onCancel() {},
  onConfirm: function onConfirm() {}
};
var _default = ConfirmModal;
exports["default"] = _default;