"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRte = require("react-rte");

var _reactRte2 = _interopRequireDefault(_reactRte);

var _FormField = require("../FormField");

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


// const TextAreaInput = (props) => {
var MarkdownInput = function (_React$Component) {
  _inherits(MarkdownInput, _React$Component);

  _createClass(MarkdownInput, null, [{
    key: "createValueFromMd",
    value: function createValueFromMd(value) {
      return value && value.length ? _reactRte2.default.createValueFromString(value, "markdown") : _reactRte2.default.createEmptyValue();
    }
  }, {
    key: "getToolbarConfig",
    value: function getToolbarConfig() {
      return {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS", "LINK_BUTTONS", "BLOCK_TYPE_DROPDOWN", "HISTORY_BUTTONS"],
        INLINE_STYLE_BUTTONS: [{ label: "Bold", style: "BOLD", className: "custom-css-class" }, { label: "Italic", style: "ITALIC" }, { label: "Monospace", style: "CODE" }],
        BLOCK_TYPE_DROPDOWN: [{ label: "Normal", style: "unstyled" }, { label: "Heading Large", style: "header-one" }, { label: "Heading Medium", style: "header-two" }, { label: "Heading Small", style: "header-three" }, { label: "Code Block", style: "code-block" }],
        BLOCK_TYPE_BUTTONS: [{ label: "UL", style: "unordered-list-item" }, { label: "OL", style: "ordered-list-item" }, { label: "Blockquote", style: "blockquote" }]
      };
    }
  }]);

  function MarkdownInput(props) {
    _classCallCheck(this, MarkdownInput);

    var _this = _possibleConstructorReturn(this, (MarkdownInput.__proto__ || Object.getPrototypeOf(MarkdownInput)).call(this, props));

    var value = _this.props.input.value;


    _this.state = {
      value: MarkdownInput.createValueFromMd(value),
      mdValue: value
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(MarkdownInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.input.value;

      if (value !== this.state.mdValue) {
        this.setState({
          value: MarkdownInput.createValueFromMd(value),
          mdValue: value
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var _this2 = this;

      var markdown = value.toString("markdown");
      this.setState({ value: value, mdValue: markdown }, function () {
        // check for empty
        if (markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
          markdown = "";
        }

        _this2.props.input.onChange(markdown);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          help = _props.help,
          label = _props.label,
          prefix = _props.prefix,
          noLabel = _props.noLabel,
          vertical = _props.vertical,
          _props$input = _props.input,
          onChange = _props$input.onChange,
          inputProps = _objectWithoutProperties(_props$input, ["onChange"]),
          meta = _props.meta;

      var value = this.state.value;


      return _react2.default.createElement(
        _FormField2.default,
        {
          label: label,
          prefix: prefix,
          meta: meta,
          help: help,
          noLabel: noLabel,
          vertical: vertical,
          className: "md-editor"
        },
        _react2.default.createElement(_reactRte2.default, _extends({
          onChange: this.handleChange
        }, inputProps, {
          value: value,
          toolbarConfig: MarkdownInput.getToolbarConfig()
        }))
      );
    }
  }]);

  return MarkdownInput;
}(_react2.default.Component);

MarkdownInput.shouldComponentUpdate = _FormField2.default.shouldFormFieldUpdate;

MarkdownInput.propTypes = {
  meta: _propTypes2.default.shape().isRequired,
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  vertical: _propTypes2.default.bool,
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  prefix: _propTypes2.default.node,
  input: _propTypes2.default.shape({
    value: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired
  }).isRequired,
  noLabel: _propTypes2.default.bool
};

MarkdownInput.defaultProps = {
  help: "",
  label: "",
  prefix: null,
  noLabel: false,
  vertical: false
};

exports.default = MarkdownInput;