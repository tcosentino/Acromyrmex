"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcCalendar = _interopRequireDefault(require("rc-calendar"));

var _Picker = _interopRequireDefault(require("rc-calendar/lib/Picker"));

require("rc-calendar/assets/index.css");

require("rc-time-picker/assets/index.css");

var _Panel = _interopRequireDefault(require("rc-time-picker/lib/Panel"));

require("./style.css");

var _FormField = _interopRequireDefault(require("../FormField"));

var _Mention = _interopRequireDefault(require("../MarkdownInput/Mention"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DateInput = /*#__PURE__*/function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput(props) {
    var _this;

    _classCallCheck(this, DateInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateInput).call(this, props)); // console.log({ value: props.input.value, length: props.input.value.length });

    _this.state = {
      optionSelected: props.input.value.indexOf('{') > -1 && props.input.value.indexOf('}') > -1,
      open: false
    };
    return _this;
  }

  _createClass(DateInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          help = _this$props.help,
          label = _this$props.label,
          prefix = _this$props.prefix,
          noLabel = _this$props.noLabel,
          vertical = _this$props.vertical,
          autoFocus = _this$props.autoFocus,
          addonAfter = _this$props.addonAfter,
          addonBefore = _this$props.addonBefore,
          addonCustomBefore = _this$props.addonCustomBefore,
          addonCustomAfter = _this$props.addonCustomAfter,
          inputProps = _extends({}, _this$props.input),
          meta = _this$props.meta,
          disabled = _this$props.disabled,
          dateFormat = _this$props.dateFormat,
          timeFormat = _this$props.timeFormat,
          dateTimeFormat = _this$props.dateTimeFormat,
          options = _this$props.options,
          maxCols = _this$props.maxCols,
          showTimeSelect = _this$props.showTimeSelect,
          showDateSelect = _this$props.showDateSelect,
          getCalendarContainer = _this$props.getCalendarContainer,
          extraProps = _objectWithoutProperties(_this$props, ["help", "label", "prefix", "noLabel", "vertical", "autoFocus", "addonAfter", "addonBefore", "addonCustomBefore", "addonCustomAfter", "input", "meta", "disabled", "dateFormat", "timeFormat", "dateTimeFormat", "options", "maxCols", "showTimeSelect", "showDateSelect", "getCalendarContainer"]);

      var _this$state = this.state,
          open = _this$state.open,
          optionSelected = _this$state.optionSelected;

      if (!showTimeSelect && !showDateSelect) {
        return _react["default"].createElement("span", {
          className: "text-danger"
        }, "Must enable ", _react["default"].createElement("code", null, "showTimeSelect"), " or ", _react["default"].createElement("code", null, "showDateSelect"));
      }

      var timePickerElement = _react["default"].createElement(_Panel["default"], {
        defaultValue: (0, _moment["default"])('00:00:00', 'HH:mm:ss')
      });

      var modeProp = {};
      var format = showTimeSelect ? dateTimeFormat : dateFormat;

      if (!showDateSelect) {
        modeProp.mode = 'time';
        format = timeFormat;
      }

      var calendar = _react["default"].createElement(_rcCalendar["default"] // autoFocus={autoFocus}
      // bsSize="small"
      , _extends({
        format: format,
        showDateInput: false,
        timePicker: showTimeSelect ? timePickerElement : null,
        style: {
          zIndex: 10000
        }
      }, modeProp, {
        className: !showDateSelect ? 'time-picker' : '',
        renderFooter: function renderFooter() {
          if (!options || !options.length) {
            return null;
          }

          return _react["default"].createElement("div", {
            className: "datetime-options"
          }, _react["default"].createElement("span", null, "Or, select an option:"), _react["default"].createElement("div", {
            className: "datetime-options-list"
          }, options.map(function (o) {
            return _react["default"].createElement(_Mention["default"], {
              key: o.textValue,
              mention: o,
              onClick: function onClick() {
                inputProps.onChange(o.textValue);

                _this2.setState({
                  optionSelected: true,
                  open: false
                });
              }
            });
          })));
        }
      }));

      var valueToUse = null;
      var m = null;

      if (_underscore["default"].isObject(inputProps.value) || _underscore["default"].isString(inputProps.value) && !inputProps.value.includes('{')) {
        m = (0, _moment["default"])(inputProps.value);
      }

      if (m && _underscore["default"].isFunction(m.isValid) && m.isValid()) {
        valueToUse = m;
      }

      return _react["default"].createElement(_FormField["default"], _extends({
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
      }, extraProps), _react["default"].createElement(_Picker["default"], {
        animation: "slide-up",
        disabled: disabled,
        calendar: calendar,
        value: valueToUse,
        getCalendarContainer: getCalendarContainer,
        onOpenChange: function onOpenChange(newOpen) {
          _this2.setState({
            open: newOpen
          });
        },
        open: open,
        onChange: function onChange(date) {
          inputProps.onChange(date ? (0, _moment["default"])(date).toDate() : '');

          _this2.setState({
            optionSelected: false
          });
        }
      }, function (_ref) {
        var value = _ref.value;

        if (!optionSelected) {
          return _react["default"].createElement("input", {
            placeholder: "please select",
            disabled: disabled,
            readOnly: true,
            tabIndex: "-1",
            className: "form-control form-control-no-readonly",
            value: value && value.format(format) || ''
          });
        }

        var myOption = options.find(function (o) {
          return o.textValue === inputProps.value;
        });
        return _react["default"].createElement("span", {
          className: "form-control"
        }, _react["default"].createElement("span", {
          className: "form-control-template-value"
        }, myOption ? myOption.stepName : '', ' ->', " ", myOption ? myOption.name : ''));
      }));
    }
  }]);

  return DateInput;
}(_react["default"].Component);

DateInput.shouldComponentUpdate = _FormField["default"].shouldFormFieldUpdate;
DateInput.propTypes = {
  meta: _propTypes["default"].shape().isRequired,
  vertical: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  prefix: _propTypes["default"].node,
  input: _propTypes["default"].shape().isRequired,
  noLabel: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  addonAfter: _propTypes["default"].string,
  addonBefore: _propTypes["default"].string,
  addonCustomAfter: _propTypes["default"].node,
  addonCustomBefore: _propTypes["default"].node,
  maxCols: _propTypes["default"].number,
  // specific to the date picker
  dateFormat: _propTypes["default"].string,
  timeFormat: _propTypes["default"].string,
  dateTimeFormat: _propTypes["default"].string,
  showTimeSelect: _propTypes["default"].bool,
  showDateSelect: _propTypes["default"].bool,
  getCalendarContainer: _propTypes["default"].func
};
DateInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  help: '',
  label: '',
  vertical: false,
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
  showDateSelect: true,
  getCalendarContainer: null
};
var _default = DateInput;
exports["default"] = _default;