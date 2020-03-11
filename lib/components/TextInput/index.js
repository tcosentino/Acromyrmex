'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UiComponents = require('../../utility/UiComponents');

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


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
      inputProps = _objectWithoutProperties(props.input, []),
      meta = props.meta,
      disabled = props.disabled,
      maxCols = props.maxCols;

  var type = props.type;

  // alias

  if (type === 'datetime') {
    type = 'datetime-local';
  }

  return _react2.default.createElement(
    _FormField2.default,
    {
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
    },
    _react2.default.createElement(_UiComponents.FormControl, _extends({
      type: type,
      disabled: disabled,
      autoFocus: autoFocus
      // bsSize="small"
    }, inputProps, {
      onPaste: onPaste,
      onDrop: function onDrop(e) {
        if (e.dataTransfer.files.length) {
          inputProps.onDrop(e);
        }
      }
    }))
  );
};

TextInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

TextInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  vertical: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  type: _propTypes2.default.string,
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  noLabel: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  addonAfter: _propTypes2.default.string,
  addonBefore: _propTypes2.default.string,
  addonCustomAfter: _propTypes2.default.node,
  addonCustomBefore: _propTypes2.default.node,
  onPaste: _propTypes2.default.func,
  maxCols: _propTypes2.default.number
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

exports.default = TextInput;