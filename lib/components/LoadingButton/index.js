'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LoadingButton = function LoadingButton(props) {
  var icon = props.icon,
      label = props.label,
      loading = props.loading,
      disabled = props.disabled,
      loadingLabel = props.loadingLabel,
      btnProps = _objectWithoutProperties(props, ['icon', 'label', 'loading', 'disabled', 'loadingLabel']);

  return _react2.default.createElement(
    _Button2.default,
    _extends({ disabled: loading || disabled }, btnProps),
    loading ? _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(_Loading2.default, { inline: true, delay: false }),
      icon && _react2.default.createElement('img', { src: icon, alt: '...', className: 'LoadingButton__icon' }),
      loadingLabel || label + 'ing',
      '\u2026'
    ) : _react2.default.createElement(
      'span',
      null,
      icon && _react2.default.createElement('img', { src: icon, alt: '...', className: 'LoadingButton__icon' }),
      label
    )
  );
};

LoadingButton.propTypes = {
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]).isRequired,
  loading: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  // Defaults to label + 'ing' if not provided
  loadingLabel: _propTypes2.default.string
};

LoadingButton.defaultProps = {
  icon: false,
  disabled: false,
  loadingLabel: ''
};

exports.default = LoadingButton;