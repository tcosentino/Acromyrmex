'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var StaticField = function (_React$Component) {
  _inherits(StaticField, _React$Component);

  function StaticField() {
    _classCallCheck(this, StaticField);

    return _possibleConstructorReturn(this, (StaticField.__proto__ || Object.getPrototypeOf(StaticField)).apply(this, arguments));
  }

  _createClass(StaticField, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.label !== nextProps.label || this.props.input.value !== nextProps.input.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          value = _props.input.value,
          meta = _props.meta,
          help = _props.help,
          vertical = _props.vertical,
          noLabel = _props.noLabel;


      return _react2.default.createElement(
        _FormField2.default,
        {
          inputClass: 'form-control-static',
          label: label,
          meta: meta,
          help: help,
          vertical: vertical,
          noLabel: noLabel
        },
        value,
        ' (required)'
      );
    }
  }]);

  return StaticField;
}(_react2.default.Component);

StaticField.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  vertical: _propTypes2.default.bool,
  noLabel: _propTypes2.default.bool,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  input: _propTypes2.default.shape({
    value: _propTypes2.default.string
  }).isRequired,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
};

StaticField.defaultProps = {
  label: '',
  vertical: false,
  noLabel: false,
  help: ''
};

module.exports = StaticField;