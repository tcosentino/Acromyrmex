'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // from: https://gist.github.com/insin/bbf116e8ea10ef38447b


var Loading = function (_React$Component) {
  _inherits(Loading, _React$Component);

  function Loading(props) {
    _classCallCheck(this, Loading);

    var _this = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, props));

    _this.state = {
      delaying: !!_this.props.delay
    };
    return _this;
  }

  _createClass(Loading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.delay) {
        this.timeout = setTimeout(this.handleDisplay.bind(this), this.props.delay);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'handleDisplay',
    value: function handleDisplay() {
      this.timeout = null;
      this.setState({ delaying: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          delay = _props.delay,
          inline = _props.inline,
          text = _props.text;
      var delaying = this.state.delaying;

      var className = (0, _classnames2.default)('loading', {
        'loading--delaying': delaying,
        'loading--displaying': delay && !delaying,
        'loading--inline': inline
      });
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement('i', { className: 'fa fa-spin fa-spinner' }),
        text && _react2.default.createElement(
          'div',
          { className: 'Loading__text pull-left' },
          text,
          '\u2026'
        )
      );
    }
  }]);

  return Loading;
}(_react2.default.Component);

Loading.propTypes = {
  delay: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  inline: _propTypes2.default.bool,
  text: _propTypes2.default.string
};

Loading.defaultProps = {
  delay: 500,
  inline: false,
  text: ''
};

exports.default = Loading;