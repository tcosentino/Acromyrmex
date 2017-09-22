'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

// import { change }


var TemplateInput = function (_React$Component) {
  _inherits(TemplateInput, _React$Component);

  function TemplateInput(props) {
    _classCallCheck(this, TemplateInput);

    var _this = _possibleConstructorReturn(this, (TemplateInput.__proto__ || Object.getPrototypeOf(TemplateInput)).call(this, props));

    _this.state = {
      focused: false
    };

    _this.renderOption = _this.renderOption.bind(_this);
    return _this;
  }

  _createClass(TemplateInput, [{
    key: 'renderOption',
    value: function renderOption(option) {
      var _this2 = this;

      return _react2.default.createElement(
        _reactBootstrap.Col,
        {
          xs: 12,
          key: option.name,
          className: 'template-option',
          onClick: function onClick() {
            _this2.props.onTemplateClicked(option);
          }
        },
        option.name
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          help = _props.help,
          label = _props.label,
          prefix = _props.prefix,
          noLabel = _props.noLabel,
          vertical = _props.vertical,
          options = _props.options,
          autoFocus = _props.autoFocus,
          addonAfter = _props.addonAfter,
          addonBefore = _props.addonBefore,
          addonCustomBefore = _props.addonCustomBefore,
          addonCustomAfter = _props.addonCustomAfter,
          inputProps = _objectWithoutProperties(_props.input, []),
          meta = _props.meta,
          disabled = _props.disabled;

      var type = this.props.type;

      // alias

      if (type === 'datetime') {
        type = 'datetime-local';
      }

      var input = _react2.default.createElement(_reactBootstrap.FormControl, _extends({
        type: type,
        disabled: disabled,
        autoFocus: autoFocus
      }, inputProps, {
        onFocus: function onFocus() {
          _this3.setState({ focused: true });
        },
        onBlur: function onBlur() {
          // this delay lets clicking the box work
          setTimeout(function () {
            _this3.setState({ focused: false });
          }, 250);
        }
      }));

      if (addonBefore || addonAfter) {
        input = _react2.default.createElement(
          _reactBootstrap.InputGroup,
          null,
          addonBefore && _react2.default.createElement(
            _reactBootstrap.InputGroup.Addon,
            null,
            addonBefore
          ),
          input,
          addonAfter && _react2.default.createElement(
            _reactBootstrap.InputGroup.Addon,
            null,
            addonAfter
          )
        );
      }

      if (addonCustomBefore || addonCustomAfter) {
        input = _react2.default.createElement(
          _reactBootstrap.InputGroup,
          null,
          addonCustomBefore,
          input,
          addonCustomAfter
        );
      }

      return _react2.default.createElement(
        _FormField2.default,
        {
          label: label,
          prefix: prefix,
          meta: meta,
          help: help,
          vertical: vertical,
          noLabel: noLabel
        },
        input,
        (this.state.focused || false) && _react2.default.createElement(
          _reactBootstrap.Panel,
          {
            header: 'Enter a value, or select an option from a previous step:',
            className: 'template-input-panel'
          },
          _react2.default.createElement(
            _reactBootstrap.Row,
            { className: 'option-scroller' },
            options.length < 1 && _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              'No options!'
            ),
            options.map(this.renderOption)
          )
        )
      );
    }
  }]);

  return TemplateInput;
}(_react2.default.Component);

TemplateInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

TemplateInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  onTemplateClicked: _propTypes2.default.func,
  vertical: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  help: _propTypes2.default.string,
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  type: _propTypes2.default.string,
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  noLabel: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  addonAfter: _propTypes2.default.string,
  addonBefore: _propTypes2.default.string,
  addonCustomAfter: _propTypes2.default.node,
  addonCustomBefore: _propTypes2.default.node
};

TemplateInput.defaultProps = {
  onTemplateClicked: function onTemplateClicked() {},
  disabled: false,
  help: '',
  autoFocus: false,
  options: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null
};

exports.default = TemplateInput;