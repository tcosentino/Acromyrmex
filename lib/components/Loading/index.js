"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Loading = /*#__PURE__*/function (_React$Component) {
  _inherits(Loading, _React$Component);

  function Loading(props) {
    var _this;

    _classCallCheck(this, Loading);

    var delay = props.delay;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Loading).call(this, props));
    _this.state = {
      delaying: !!delay
    };
    return _this;
  }

  _createClass(Loading, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var delay = this.props.delay;

      if (delay) {
        this.timeout = setTimeout(this.handleDisplay.bind(this), delay);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "handleDisplay",
    value: function handleDisplay() {
      this.timeout = null;
      this.setState({
        delaying: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          delay = _this$props.delay,
          inline = _this$props.inline,
          text = _this$props.text;
      var delaying = this.state.delaying;
      var className = (0, _classnames["default"])('loading', {
        'loading--delaying': delaying,
        'loading--displaying': delay && !delaying,
        'loading--inline': inline
      });
      return _react["default"].createElement("div", {
        className: className
      }, _react["default"].createElement("i", {
        className: "fa fa-spin fa-spinner pull-left"
      }), text && _react["default"].createElement("div", {
        className: "Loading__text pull-left"
      }, text, "\u2026"));
    }
  }]);

  return Loading;
}(_react["default"].Component);

Loading.propTypes = {
  delay: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].number]),
  inline: _propTypes["default"].bool,
  text: _propTypes["default"].string
};
Loading.defaultProps = {
  delay: 500,
  inline: false,
  text: ''
};
var _default = Loading;
exports["default"] = _default;