'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var TextAreaInput = function TextAreaInput(props) {
  var help = props.help,
      label = props.label,
      prefix = props.prefix,
      noLabel = props.noLabel,
      disabled = props.disabled,
      vertical = props.vertical,
      inputProps = _objectWithoutProperties(props.input, []),
      meta = props.meta;

  return _react2.default.createElement(
    _FormField2.default,
    {
      label: label,
      prefix: prefix,
      meta: meta,
      help: help,
      noLabel: noLabel,
      vertical: vertical
    },
    _react2.default.createElement(_reactBootstrap.FormControl, _extends({ componentClass: 'textarea', disabled: disabled }, inputProps))
  );
};

TextAreaInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

TextAreaInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  disabled: _propTypes2.default.bool,
  noLabel: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool
};

TextAreaInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false,
  disabled: false,
  vertical: false
};

module.exports = TextAreaInput;