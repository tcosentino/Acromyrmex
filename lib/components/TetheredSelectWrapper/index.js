"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _reactTether = _interopRequireDefault(require("react-tether"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* from https://github.com/JedWatson/react-select/issues/810#issuecomment-250274937 */
var TetheredSelectWrap = /*#__PURE__*/function (_Select) {
  _inherits(TetheredSelectWrap, _Select);

  function TetheredSelectWrap(props) {
    var _this;

    _classCallCheck(this, TetheredSelectWrap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TetheredSelectWrap).call(this, props));
    _this.renderOuter = _this._renderOuter;
    return _this;
  }

  _createClass(TetheredSelectWrap, [{
    key: "_renderOuter",
    value: function _renderOuter() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var menu = _get(_getPrototypeOf(TetheredSelectWrap.prototype), "renderOuter", this).apply(this, rest); // Don't return an updated menu render if we don't have one


      if (!menu) {
        return;
      }
      /* this.wrapper comes from the ref of the main Select component (super.render()) */


      var selectWidth = this.wrapper ? this.wrapper.offsetWidth : null;
      return _react["default"].createElement(_reactTether["default"], {
        renderElementTo: "body",
        attachment: "top left",
        targetAttachment: "top left",
        constraints: [{
          to: 'window',
          attachment: 'together',
          pin: ['top']
        }]
      }, _react["default"].createElement("div", null), _react["default"].cloneElement(menu, {
        style: {
          position: 'static',
          width: selectWidth
        }
      }));
    }
  }]);

  return TetheredSelectWrap;
}(_reactSelect["default"]);

exports["default"] = TetheredSelectWrap;