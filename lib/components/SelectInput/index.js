"use strict";

var _underscore = _interopRequireDefault(require("underscore"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("react-select/dist/react-select.css");

require("./style.css");

var _Loading = _interopRequireDefault(require("../Loading"));

var _TetheredSelectWrapper = _interopRequireDefault(require("../TetheredSelectWrapper"));

var _ConfirmModal = _interopRequireDefault(require("../ConfirmModal"));

var _FormField = _interopRequireDefault(require("../FormField"));

var _Mention = _interopRequireDefault(require("../MarkdownInput/Mention"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectInput = /*#__PURE__*/function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  _createClass(SelectInput, null, [{
    key: "templateValueRenderer",
    value: function templateValueRenderer(option) {
      if (option.textValue) {
        return _react["default"].createElement("span", {
          className: "form-control-template-value"
        }, option.stepName, " ", '->', " ", option.name);
      }

      return _react["default"].createElement("span", null, option.name);
    }
  }]);

  function SelectInput(props) {
    var _this;

    _classCallCheck(this, SelectInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectInput).call(this, props));
    _this.state = {
      // value: '',
      showModal: false,
      pendingVal: null
    };
    _this.templateOptionRenderer = _this.templateOptionRenderer.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SelectInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var myOptions = this.getOptions();
      var _this$props = this.props,
          enableEmpty = _this$props.enableEmpty,
          multi = _this$props.multi;

      if (!this.valueInOptions() && !enableEmpty && myOptions[0] && !multi) {
        var firstOption = myOptions.find(function (o) {
          return !o.disabled;
        }) || myOptions[0];

        if (firstOption) {
          this.sendChange(firstOption.value);
        }
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this$props2 = this.props,
          options = _this$props2.options,
          enableAll = _this$props2.enableAll,
          templateOptions = _this$props2.templateOptions;
      var myOptions = options.map(function (item) {
        return _objectSpread({}, item, {
          value: item.id,
          label: item.name
        });
      });

      if (enableAll) {
        myOptions.unshift({
          value: 'all',
          label: 'All'
        });
      }

      if (templateOptions.length) {
        myOptions.push.apply(myOptions, _toConsumableArray(templateOptions.map(function (o) {
          return _objectSpread({}, o, {
            label: o.name,
            value: o.textValue
          });
        })));
      }

      return myOptions;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var _this$props3 = this.props,
          input = _this$props3.input,
          jsonParse = _this$props3.jsonParse,
          multi = _this$props3.multi;
      var val = input.value;

      if (jsonParse) {
        val = JSON.stringify(input.value);
      }

      if (multi && val && _underscore["default"].isArray(val)) {
        val = val.join(',');
      }

      return val;
    }
  }, {
    key: "valueInOptions",
    value: function valueInOptions() {
      var myOptions = this.getOptions();
      var value = this.getValue();
      var valFound = false;

      _underscore["default"].each(myOptions, function (option) {
        valFound = valFound || option.value === value || JSON.stringify(option.value) === value;
      });

      return valFound;
    } // this is confusing.. needs to be cleared up

  }, {
    key: "handleChange",
    value: function handleChange(val) {
      var _this$props4 = this.props,
          jsonParse = _this$props4.jsonParse,
          multi = _this$props4.multi;
      var update = val; // for single select, comes back as val.value

      if (val && val.value) {
        update = val.value;
      } // for multi select, comes back as list of val.value


      if (multi) {
        update = update.map(function (value) {
          return value.value;
        });
      }

      if (jsonParse) {
        try {
          update = JSON.parse(update);
        } catch (e) {// empty
        }
      }

      this.sendChange(update);
    }
  }, {
    key: "sendChange",
    value: function sendChange(value) {
      var _this$props5 = this.props,
          onChangeAction = _this$props5.onChangeAction,
          input = _this$props5.input;
      input.onChange(value); // this.setState({ value });

      onChangeAction(value, input.name);
    }
  }, {
    key: "templateOptionRenderer",
    value: function templateOptionRenderer(option) {
      var inputProps = _extends({}, this.props.input);

      if (option.textValue) {
        return _react["default"].createElement(_Mention["default"], {
          key: option.textValue,
          mention: option,
          onClick: function onClick() {
            inputProps.onChange(option.textValue); // this.setState({ optionSelected: true, open: false });
          }
        });
      }

      return _react["default"].createElement("span", null, option.name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          label = _this$props6.label,
          help = _this$props6.help,
          loading = _this$props6.loading,
          enableEmpty = _this$props6.enableEmpty,
          addon = _this$props6.addon,
          multi = _this$props6.multi,
          meta = _this$props6.meta,
          noLabel = _this$props6.noLabel,
          disabled = _this$props6.disabled,
          vertical = _this$props6.vertical,
          optionRenderer = _this$props6.optionRenderer,
          valueRenderer = _this$props6.valueRenderer,
          input = _this$props6.input,
          inputProps = _extends({}, _this$props6.input),
          confirm = _this$props6.confirm,
          confirmMessage = _this$props6.confirmMessage,
          maxCols = _this$props6.maxCols,
          addonAfter = _this$props6.addonAfter,
          addonBefore = _this$props6.addonBefore,
          addonCustomBefore = _this$props6.addonCustomBefore,
          addonCustomAfter = _this$props6.addonCustomAfter;

      var _this$state = this.state,
          showModal = _this$state.showModal,
          pendingVal = _this$state.pendingVal;
      var myOptions = this.getOptions();
      var value = this.getValue();
      var valFound = this.valueInOptions();

      if (!multi && !valFound && !loading) {
        value = enableEmpty || !myOptions[0] ? null : myOptions[0].value;
      }

      var selectInput = loading ? _react["default"].createElement(_Loading["default"], null) : _react["default"].createElement(_TetheredSelectWrapper["default"], _extends({}, inputProps, {
        name: input.name,
        title: myOptions.length === 0 ? 'no available options' : '',
        disabled: myOptions.length === 0 || disabled,
        value: value,
        onBlur: function onBlur() {
          return input.onBlur(input.value);
        },
        options: myOptions,
        clearable: !multi && enableEmpty,
        optionRenderer: optionRenderer || this.templateOptionRenderer,
        valueRenderer: valueRenderer || SelectInput.templateValueRenderer,
        joinValues: true,
        multi: multi,
        onChange: function onChange(val) {
          if (confirm) {
            _this2.setState({
              showModal: true,
              pendingVal: val
            });
          } else {
            _this2.handleChange(val);
          }
        },
        ref: function ref(select) {
          _this2.select = select;
        }
      }));

      if (addon) {
        return selectInput;
      }

      return _react["default"].createElement(_FormField["default"], {
        label: label,
        vertical: vertical,
        meta: meta,
        help: help,
        noLabel: noLabel,
        loading: loading,
        maxCols: maxCols,
        addonAfter: addonAfter,
        addonBefore: addonBefore,
        addonCustomAfter: addonCustomAfter,
        addonCustomBefore: addonCustomBefore
      }, selectInput, _react["default"].createElement(_ConfirmModal["default"], {
        show: showModal,
        title: "Confirm change",
        message: confirmMessage || 'Are you sure you want to delete this process?',
        onConfirm: function onConfirm() {
          _this2.handleChange(pendingVal);

          _this2.setState({
            showModal: false,
            pendingVal: null
          });
        },
        onCancel: function onCancel() {
          _this2.setState({
            showModal: false,
            pendingVal: null
          });
        }
      }));
    }
  }]);

  return SelectInput;
}(_react["default"].Component);

SelectInput.propTypes = {
  meta: _propTypes["default"].shape().isRequired,
  help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  multi: _propTypes["default"].bool,
  loading: _propTypes["default"].bool,
  addon: _propTypes["default"].bool,
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  templateOptions: _propTypes["default"].arrayOf(_propTypes["default"].shape()),
  enableAll: _propTypes["default"].bool,
  enableEmpty: _propTypes["default"].bool,
  onChangeAction: _propTypes["default"].func,
  input: _propTypes["default"].shape().isRequired,
  confirmMessage: _propTypes["default"].string,
  confirm: _propTypes["default"].bool,
  noLabel: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  vertical: _propTypes["default"].bool,
  jsonParse: _propTypes["default"].bool,
  optionRenderer: _propTypes["default"].func,
  valueRenderer: _propTypes["default"].func,
  maxCols: _propTypes["default"].number,
  addonAfter: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  addonBefore: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  addonCustomAfter: _propTypes["default"].node,
  addonCustomBefore: _propTypes["default"].node
};
SelectInput.defaultProps = {
  help: '',
  label: '',
  confirmMessage: 'Are you sure you want to make this change?',
  confirm: false,
  noLabel: false,
  multi: false,
  loading: false,
  disabled: false,
  enableAll: false,
  enableEmpty: false,
  vertical: false,
  jsonParse: false,
  addon: false,
  options: [],
  optionRenderer: undefined,
  valueRenderer: undefined,
  templateOptions: [],
  maxCols: 12,
  onChangeAction: function onChangeAction() {},
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null
};
module.exports = SelectInput;