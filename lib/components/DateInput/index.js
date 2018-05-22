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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcCalendar = require('rc-calendar');

var _rcCalendar2 = _interopRequireDefault(_rcCalendar);

var _Picker = require('rc-calendar/lib/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

require('rc-calendar/assets/index.css');

var _reactBootstrap = require('react-bootstrap');

require('rc-time-picker/assets/index.css');

var _Panel = require('rc-time-picker/lib/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

require('./style.css');

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Mention = require('../MarkdownInput/Mention');

var _Mention2 = _interopRequireDefault(_Mention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    console.log(props.input.value);

    _this.state = {
      optionSelected: props.input.value.indexOf('{') > -1 && props.input.value.indexOf('}') > -1,
      open: false
    };
    return _this;
  }

  _createClass(DateInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          help = _props.help,
          label = _props.label,
          prefix = _props.prefix,
          noLabel = _props.noLabel,
          vertical = _props.vertical,
          autoFocus = _props.autoFocus,
          addonAfter = _props.addonAfter,
          addonBefore = _props.addonBefore,
          addonCustomBefore = _props.addonCustomBefore,
          addonCustomAfter = _props.addonCustomAfter,
          inputProps = _objectWithoutProperties(_props.input, []),
          meta = _props.meta,
          disabled = _props.disabled,
          dateFormat = _props.dateFormat,
          timeFormat = _props.timeFormat,
          dateTimeFormat = _props.dateTimeFormat,
          options = _props.options,
          maxCols = _props.maxCols,
          showTimeSelect = _props.showTimeSelect,
          showDateSelect = _props.showDateSelect;

      if (!showTimeSelect && !showDateSelect) {
        return _react2.default.createElement(
          'span',
          { className: 'text-danger' },
          'Must enable ',
          _react2.default.createElement(
            'code',
            null,
            'showTimeSelect'
          ),
          ' or ',
          _react2.default.createElement(
            'code',
            null,
            'showDateSelect'
          )
        );
      }

      var timePickerElement = _react2.default.createElement(_Panel2.default, { defaultValue: (0, _moment2.default)('00:00:00', 'HH:mm:ss') });

      var modeProp = {};
      var format = showTimeSelect ? dateTimeFormat : dateFormat;
      if (!showDateSelect) {
        modeProp.mode = 'time';
        format = timeFormat;
      }
      var calendar = _react2.default.createElement(_rcCalendar2.default, _extends({
        autoFocus: autoFocus
        // bsSize="small"
        , format: format,
        showDateInput: false,
        timePicker: showTimeSelect ? timePickerElement : null,
        style: { zIndex: 10000 }
      }, modeProp, {
        className: !showDateSelect ? 'time-picker' : '',
        renderFooter: function renderFooter() {
          if (!options || !options.length) {
            return null;
          }

          return _react2.default.createElement(
            'div',
            { className: 'datetime-options' },
            _react2.default.createElement(
              'span',
              null,
              'Or, select an option:'
            ),
            _react2.default.createElement(
              'div',
              { className: 'datetime-options-list' },
              options.map(function (o) {
                return _react2.default.createElement(_Mention2.default, {
                  key: o.textValue,
                  mention: o,
                  onClick: function onClick() {
                    inputProps.onChange(o.textValue);
                    _this2.setState({ optionSelected: true, open: false });
                  }
                });
              })
            )
          );
        }
      }));

      var valueToUse = null;

      var m = null;
      if (_underscore2.default.isObject(inputProps.value) || _underscore2.default.isString(inputProps.value) && !inputProps.value.includes('{')) {
        m = (0, _moment2.default)(inputProps.value);
      }

      if (m && _underscore2.default.isFunction(m.isValid) && m.isValid()) {
        valueToUse = m;
      }

      var input = _react2.default.createElement(
        _Picker2.default,
        {
          animation: 'slide-up',
          disabled: disabled,
          calendar: calendar,
          value: valueToUse,
          onOpenChange: function onOpenChange(open) {
            _this2.setState({ open: open });
          },
          open: this.state.open,
          onChange: function onChange(date) {
            inputProps.onChange(date ? (0, _moment2.default)(date).toDate() : '');
            _this2.setState({ optionSelected: false });
          }
        },
        function (_ref) {
          var value = _ref.value;

          if (!_this2.state.optionSelected) {
            return _react2.default.createElement('input', {
              placeholder: 'please select',
              disabled: disabled,
              readOnly: true,
              tabIndex: '-1',
              className: 'form-control form-control-no-readonly',
              value: value && value.format(format) || ''
            });
          }

          var myOption = options.find(function (o) {
            return o.textValue === inputProps.value;
          });
          return _react2.default.createElement(
            'span',
            { className: 'form-control' },
            _react2.default.createElement(
              'span',
              { className: 'form-control-template-value' },
              myOption ? myOption.name : ''
            )
          );
        }
      );

      if (addonBefore || addonAfter) {
        input = _react2.default.createElement(
          _reactBootstrap.InputGroup,
          { style: { width: '100%' } },
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
          { style: { width: '100%' } },
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
          noLabel: noLabel,
          maxCols: maxCols
        },
        input
      );
    }
  }]);

  return DateInput;
}(_react2.default.Component);

DateInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

DateInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  vertical: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  noLabel: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  addonAfter: _propTypes2.default.string,
  addonBefore: _propTypes2.default.string,
  addonCustomAfter: _propTypes2.default.node,
  addonCustomBefore: _propTypes2.default.node,
  maxCols: _propTypes2.default.number,

  // specific to the date picker
  dateFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.string,
  dateTimeFormat: _propTypes2.default.string,
  showTimeSelect: _propTypes2.default.bool,
  showDateSelect: _propTypes2.default.bool
};

DateInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  help: '',
  label: '',
  vertical: false,
  onPaste: function onPaste() {},
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  options: null,
  maxCols: 12,
  timeFormat: 'LT',
  dateFormat: 'LL',
  dateTimeFormat: 'LLL',
  showTimeSelect: true,
  showDateSelect: true
};

exports.default = DateInput;