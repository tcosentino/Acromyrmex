'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _HoverHelp = require('../HoverHelp');

var _HoverHelp2 = _interopRequireDefault(_HoverHelp);

var _UiComponents = require('../../../utility/UiComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/;

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  field.foreach(function (prop) {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false;
    }
  });

  return true;
}

var FormField = function (_React$Component) {
  _inherits(FormField, _React$Component);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: 'calculateWidth',
    value: function calculateWidth() {
      var _props = this.props,
          noLabel = _props.noLabel,
          vertical = _props.vertical,
          maxCols = _props.maxCols;


      if (vertical) {
        return maxCols;
      }

      return noLabel ? maxCols : 8;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          help = _props2.help,
          label = _props2.label,
          prefix = _props2.prefix,
          error = _props2.meta.error,
          loading = _props2.loading,
          noLabel = _props2.noLabel,
          stripped = _props2.stripped,
          maxCols = _props2.maxCols,
          addonBefore = _props2.addonBefore,
          addonAfter = _props2.addonAfter,
          addonCustomBefore = _props2.addonCustomBefore,
          addonCustomAfter = _props2.addonCustomAfter,
          children = _props2.children;


      if (loading) {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Loading2.default, null),
          ' Field Loading...'
        );
      }

      var validation = error ? 'error' : null;

      var width = this.calculateWidth();
      var offset = maxCols - width;

      var input = children;
      if (addonBefore || addonAfter) {
        input = _react2.default.createElement(
          _UiComponents.InputGroup,
          { style: { width: '100%' } },
          addonBefore && _react2.default.createElement(
            _UiComponents.InputGroup.Addon,
            null,
            addonBefore
          ),
          input,
          addonAfter && _react2.default.createElement(
            _UiComponents.InputGroup.Addon,
            null,
            addonAfter
          )
        );
      }

      if (addonCustomBefore || addonCustomAfter) {
        input = _react2.default.createElement(
          _UiComponents.InputGroup,
          { style: { width: '100%' } },
          addonCustomBefore,
          input,
          addonCustomAfter
        );
      }

      var controlLabel = _react2.default.createElement(
        _UiComponents.ControlLabel,
        null,
        prefix,
        ' ',
        label,
        '  ',
        help && _react2.default.createElement(_HoverHelp2.default, { help: help })
      );

      if (stripped) {
        return _react2.default.createElement(
          _UiComponents.FormGroup,
          { className: 'clearfix', validationState: validation },
          !noLabel && controlLabel,
          ' ',
          input,
          error && _react2.default.createElement(
            _UiComponents.HelpBlock,
            null,
            error
          )
        );
      }

      return _react2.default.createElement(
        _UiComponents.FormGroup,
        { className: 'clearfix', validationState: validation },
        !noLabel && _react2.default.createElement(
          _UiComponents.Col,
          { xs: maxCols, sm: offset },
          controlLabel
        ),
        _react2.default.createElement(
          _UiComponents.Col,
          { xs: maxCols, sm: width },
          input
        ),
        _react2.default.createElement(
          _UiComponents.Col,
          { xs: maxCols, sm: width, smOffset: offset },
          error && _react2.default.createElement(
            _UiComponents.HelpBlock,
            null,
            error
          )
        )
      );
    }
  }], [{
    key: 'shouldFormFieldUpdate',

    /**
     * Perform shallow equals comparison to determine if the props of the context
     * form field component have changed, with special-case handling for the "field"
     * prop, provided by redux-form.
     * Use this as shouldComponentUpdate() on components which compose a
     * FormField in their render() method and they will only re-render when
     * necessary.
     */
    value: function shouldFormFieldUpdate(nextProps) {
      var keys = Object.keys(this.props);
      var nextKeys = Object.keys(nextProps);
      if (keys.length !== nextKeys.length) return true;
      var nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var thisProp = this.props[key];

        if (!nextHasOwnProperty(key) || key === 'field' ? !fieldShallowEquals(thisProp, nextProps[key]) : thisProp !== nextProps[key]) {
          return true;
        }
      }
      return false;
    }
  }]);

  return FormField;
}(_react2.default.Component);

FormField.propTypes = {
  meta: _propTypes2.default.shape(),

  // Help text to be displayed next to the label
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),

  // Label text
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prefix: _propTypes2.default.node,

  noLabel: _propTypes2.default.bool,

  vertical: _propTypes2.default.bool,

  maxCols: _propTypes2.default.number,

  // removes Row/Col layout.. just the raw input and label
  stripped: _propTypes2.default.bool,

  // Loading state
  loading: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,

  // addons for inputs
  addonAfter: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  addonBefore: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  addonCustomAfter: _propTypes2.default.node,
  addonCustomBefore: _propTypes2.default.node
};

FormField.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  vertical: false,
  maxCols: 12,

  meta: { error: '' },

  loading: false,
  noLabel: false,

  stripped: false,

  // addons for inputs
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null
};

module.exports = FormField;