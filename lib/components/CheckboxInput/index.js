'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var CheckboxInput = function (_React$Component) {
  _inherits(CheckboxInput, _React$Component);

  function CheckboxInput() {
    _classCallCheck(this, CheckboxInput);

    return _possibleConstructorReturn(this, (CheckboxInput.__proto__ || Object.getPrototypeOf(CheckboxInput)).apply(this, arguments));
  }

  _createClass(CheckboxInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var input = this.props.input;


      if (!input.value) {
        input.onChange(false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          help = _props.help,
          label = _props.label,
          prefix = _props.prefix,
          noLabel = _props.noLabel,
          disabled = _props.disabled,
          inputProps = _objectWithoutProperties(_props.input, []),
          error = _props.meta.error;

      var helpPopover = _react2.default.createElement(
        _reactBootstrap.Popover,
        { id: 'field-' + inputProps.name + '-help' },
        help
      );

      var validation = error ? 'error' : null;

      var offset = noLabel ? 0 : 4;
      var width = noLabel ? 12 : 8;
      var centerClass = noLabel ? 'text-center' : '';

      var value = inputProps.value;


      return _react2.default.createElement(
        _reactBootstrap.FormGroup,
        { validationState: validation },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 12, md: width, mdOffset: offset, className: centerClass },
          _react2.default.createElement(
            _reactBootstrap.Checkbox,
            _extends({
              inline: true
            }, inputProps, {
              disabled: disabled,
              checked: _underscore2.default.isString(value) && value === 'true' || _underscore2.default.isBoolean(value) && inputProps.value
            }),
            !noLabel && _react2.default.createElement(
              'span',
              null,
              prefix,
              ' ',
              label,
              ' ',
              help && _react2.default.createElement(
                _reactBootstrap.OverlayTrigger,
                {
                  trigger: ['hover', 'focus'],
                  placement: 'right',
                  overlay: helpPopover,
                  rootClose: true
                },
                _react2.default.createElement('i', { className: 'fa fa-question-circle' })
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 12, md: width, mdOffset: offset },
          error && _react2.default.createElement(
            _reactBootstrap.HelpBlock,
            null,
            error
          )
        )
      );
    }
  }]);

  return CheckboxInput;
}(_react2.default.Component);

CheckboxInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

CheckboxInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  noLabel: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

CheckboxInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false,
  disabled: false
};

exports.default = CheckboxInput;