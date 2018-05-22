'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('react-select/dist/react-select.css');

require('./style.css');

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _TetheredSelectWrapper = require('../TetheredSelectWrapper');

var _TetheredSelectWrapper2 = _interopRequireDefault(_TetheredSelectWrapper);

var _ConfirmModal = require('../ConfirmModal');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Mention = require('../MarkdownInput/Mention');

var _Mention2 = _interopRequireDefault(_Mention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var SelectInput = function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  _createClass(SelectInput, null, [{
    key: 'templateValueRenderer',
    value: function templateValueRenderer(option) {
      if (option.textValue) {
        return _react2.default.createElement(
          'span',
          { className: 'form-control-template-value' },
          option.name
        );
      }

      return _react2.default.createElement(
        'span',
        null,
        option.name
      );
    }
  }]);

  function SelectInput(props) {
    _classCallCheck(this, SelectInput);

    var _this = _possibleConstructorReturn(this, (SelectInput.__proto__ || Object.getPrototypeOf(SelectInput)).call(this, props));

    _this.state = {
      value: '',
      showModal: false,
      pendingVal: null
    };

    _this.templateOptionRenderer = _this.templateOptionRenderer.bind(_this);
    _this.templateValueRenderer = _this.templateValueRenderer.bind(_this);
    return _this;
  }

  _createClass(SelectInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var myOptions = this.getOptions();
      var enableEmpty = this.props.enableEmpty;


      if (!this.valueInOptions() && !enableEmpty && myOptions[0]) {
        this.sendChange(myOptions[0].value);
      }
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var _props = this.props,
          options = _props.options,
          enableAll = _props.enableAll,
          templateOptions = _props.templateOptions;

      var myOptions = options.map(function (item) {
        return _extends({}, item, {
          value: item.id,
          label: item.name
        });
      });

      if (enableAll) {
        myOptions.unshift({ value: 'all', label: 'All' });
      }

      if (templateOptions.length) {
        myOptions.push.apply(myOptions, _toConsumableArray(templateOptions.map(function (o) {
          return _extends({}, o, { label: o.name, value: o.textValue });
        })));
      }

      return myOptions;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var _props2 = this.props,
          input = _props2.input,
          jsonParse = _props2.jsonParse,
          multi = _props2.multi;

      var val = input.value;

      if (jsonParse) {
        val = JSON.stringify(input.value);
      }

      if (multi && val && _underscore2.default.isArray(val)) {
        val = val.join(',');
      }

      return val;
    }
  }, {
    key: 'valueInOptions',
    value: function valueInOptions() {
      var myOptions = this.getOptions();
      var value = this.getValue();

      var valFound = false;
      _underscore2.default.each(myOptions, function (option) {
        valFound = valFound || option.value === value || JSON.stringify(option.value) === value;
      });

      return valFound;
    }

    // this is confusing.. needs to be cleared up

  }, {
    key: 'handleChange',
    value: function handleChange(val) {
      var _props3 = this.props,
          jsonParse = _props3.jsonParse,
          multi = _props3.multi;


      var update = val;

      // for single select, comes back as val.value
      if (val && val.value) {
        update = val.value;
      }

      // for multi select, comes back as list of val.value
      if (multi) {
        update = update.map(function (value) {
          return value.value;
        });
      }

      if (jsonParse) {
        try {
          update = JSON.parse(update);
        } catch (e) {
          // empty
        }
      }

      this.sendChange(update);
    }
  }, {
    key: 'sendChange',
    value: function sendChange(value) {
      var _props4 = this.props,
          onChangeAction = _props4.onChangeAction,
          input = _props4.input;


      input.onChange(value);
      this.setState({ value: value });
      onChangeAction(value, input.name);
    }
  }, {
    key: 'templateOptionRenderer',
    value: function templateOptionRenderer(option) {
      var _this2 = this;

      var inputProps = _objectWithoutProperties(this.props.input, []);

      if (option.textValue) {
        return _react2.default.createElement(_Mention2.default, {
          key: option.textValue,
          mention: option,
          onClick: function onClick() {
            inputProps.onChange(option.textValue);
            _this2.setState({ optionSelected: true, open: false });
          }
        });
      }
      return _react2.default.createElement(
        'span',
        null,
        option.name
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props5 = this.props,
          label = _props5.label,
          help = _props5.help,
          loading = _props5.loading,
          enableEmpty = _props5.enableEmpty,
          addon = _props5.addon,
          multi = _props5.multi,
          meta = _props5.meta,
          noLabel = _props5.noLabel,
          disabled = _props5.disabled,
          vertical = _props5.vertical,
          optionRenderer = _props5.optionRenderer,
          valueRenderer = _props5.valueRenderer,
          input = _props5.input,
          inputProps = _objectWithoutProperties(_props5.input, []),
          confirm = _props5.confirm,
          confirmMessage = _props5.confirmMessage,
          maxCols = _props5.maxCols;

      var myOptions = this.getOptions();
      var value = this.getValue();
      var valFound = this.valueInOptions();

      if (!multi && !valFound && !loading) {
        value = enableEmpty || !myOptions[0] ? null : myOptions[0].value;
      }

      var selectInput = loading ? _react2.default.createElement(_Loading2.default, null) : _react2.default.createElement(_TetheredSelectWrapper2.default, _extends({}, inputProps, {
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
        valueRenderer: valueRenderer || this.templateValueRenderer,
        joinValues: true,
        multi: multi,
        onChange: function onChange(val) {
          if (confirm) {
            _this3.setState({ showModal: true, pendingVal: val });
          } else {
            _this3.handleChange(val);
          }
        },
        ref: function ref(select) {
          _this3.select = select;
        }
      }));

      if (addon) {
        return selectInput;
      }

      return _react2.default.createElement(
        _FormField2.default,
        {
          label: label,
          vertical: vertical,
          meta: meta,
          help: help,
          noLabel: noLabel,
          loading: loading,
          maxCols: maxCols
        },
        selectInput,
        _react2.default.createElement(_ConfirmModal2.default, {
          show: this.state.showModal,
          title: 'Confirm change',
          message: confirmMessage || 'Are you sure you want to delete this process?',
          onConfirm: function onConfirm() {
            _this3.handleChange(_this3.state.pendingVal);
            _this3.setState({ showModal: false, pendingVal: null });
          },
          onCancel: function onCancel() {
            _this3.setState({ showModal: false, pendingVal: null });
          }
        })
      );
    }
  }]);

  return SelectInput;
}(_react2.default.Component);

SelectInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.string,
  multi: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  addon: _propTypes2.default.bool,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  templateOptions: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  enableAll: _propTypes2.default.bool,
  enableEmpty: _propTypes2.default.bool,
  onChangeAction: _propTypes2.default.func,
  input: _propTypes2.default.shape({
    name: _propTypes2.default.string
  }).isRequired,
  confirmMessage: _propTypes2.default.string,
  confirm: _propTypes2.default.bool,
  noLabel: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  jsonParse: _propTypes2.default.bool,
  optionRenderer: _propTypes2.default.func,
  valueRenderer: _propTypes2.default.func,
  maxCols: _propTypes2.default.number
};

SelectInput.defaultProps = {
  name: '',
  help: '',
  label: '',
  value: '',
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
  onChangeAction: function onChangeAction() {}
};

module.exports = SelectInput;