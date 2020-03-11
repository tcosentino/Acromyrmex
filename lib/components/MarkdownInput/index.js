'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('draft-js/dist/Draft.css');

var _UiComponents = require('../../utility/UiComponents');

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var MarkdownInput = function (_React$Component) {
  _inherits(MarkdownInput, _React$Component);

  function MarkdownInput(props) {
    _classCallCheck(this, MarkdownInput);

    var _this = _possibleConstructorReturn(this, (MarkdownInput.__proto__ || Object.getPrototypeOf(MarkdownInput)).call(this, props));

    _this.state = {
      focused: false
    };
    return _this;
  }

  _createClass(MarkdownInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          help = _props.help,
          label = _props.label,
          prefix = _props.prefix,
          noLabel = _props.noLabel,
          vertical = _props.vertical,
          options = _props.options,
          addonAfter = _props.addonAfter,
          addonBefore = _props.addonBefore,
          addonCustomBefore = _props.addonCustomBefore,
          addonCustomAfter = _props.addonCustomAfter,
          inputProps = _objectWithoutProperties(_props.input, []),
          meta = _props.meta,
          maxCols = _props.maxCols,
          plainText = _props.plainText;

      var type = this.props.type;
      var focused = this.state.focused;

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
          help: help || "Press '{' to add data from previous steps.",
          vertical: vertical,
          noLabel: noLabel,
          maxCols: maxCols,
          addonAfter: addonAfter,
          addonBefore: addonBefore,
          addonCustomAfter: addonCustomAfter,
          addonCustomBefore: addonCustomBefore
        },
        _react2.default.createElement(_Editor2.default, {
          input: inputProps,
          options: options,
          className: 'markdown-input',
          onFocus: function onFocus() {
            _this2.setState({ focused: true });
          },
          onBlur: function onBlur() {
            _this2.setState({ focused: false });
          },
          plainText: plainText
        }),
        (focused || false) && options.length > 0 && _react2.default.createElement(
          _UiComponents.HelpBlock,
          null,
          "Press '{' to add data from previous steps."
        )
      );
    }
  }]);

  return MarkdownInput;
}(_react2.default.Component);

MarkdownInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

MarkdownInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  vertical: _propTypes2.default.bool,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  type: _propTypes2.default.string,
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape().isRequired,
  noLabel: _propTypes2.default.bool,
  addonAfter: _propTypes2.default.string,
  addonBefore: _propTypes2.default.string,
  addonCustomAfter: _propTypes2.default.node,
  addonCustomBefore: _propTypes2.default.node,
  maxCols: _propTypes2.default.number,
  plainText: _propTypes2.default.bool
};

MarkdownInput.defaultProps = {
  help: '',
  options: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12,
  plainText: false
};

exports.default = MarkdownInput;