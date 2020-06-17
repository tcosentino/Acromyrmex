"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UiComponents = require("../../utility/UiComponents");

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ToolbarButton = function ToolbarButton(props) {
  var onClick = props.onClick,
      children = props.children,
      otherProps = _objectWithoutProperties(props, ["onClick", "children"]);

  return _react["default"].createElement(_UiComponents.Button, _extends({
    bsStyle: "primary",
    bsSize: "xsmall"
  }, otherProps, {
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      onClick(e);
    }
  }), children);
};

ToolbarButton.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node.isRequired
};

var Toolbar = /*#__PURE__*/function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).call(this));
    _this.state = {
      popoverTarget: null,
      showLinkOverlay: false,
      linkText: ''
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onInlineClicked = _this$props.onInlineClicked,
          onBlockClicked = _this$props.onBlockClicked,
          onUndoClicked = _this$props.onUndoClicked,
          onRedoClicked = _this$props.onRedoClicked,
          onLinkClicked = _this$props.onLinkClicked,
          onUnlinkClicked = _this$props.onUnlinkClicked,
          undoSize = _this$props.undoSize,
          redoSize = _this$props.redoSize,
          blockType = _this$props.blockType,
          selection = _this$props.selection,
          getEntityAtCursor = _this$props.getEntityAtCursor;
      var _this$state = this.state,
          linkText = _this$state.linkText,
          showLinkOverlay = _this$state.showLinkOverlay,
          popoverTarget = _this$state.popoverTarget;
      var entity = getEntityAtCursor();
      return _react["default"].createElement("div", null, _react["default"].createElement(_UiComponents.ButtonGroup, null, _react["default"].createElement(ToolbarButton, {
        onClick: function onClick() {
          onInlineClicked('BOLD');
        }
      }, _react["default"].createElement("i", {
        className: "fa fa-bold"
      })), _react["default"].createElement(ToolbarButton, {
        onClick: function onClick() {
          onInlineClicked('ITALIC');
        }
      }, _react["default"].createElement("i", {
        className: "fa fa-italic"
      }))), ' ', _react["default"].createElement(_UiComponents.SplitButton, {
        title: "Normal",
        bsSize: "xsmall",
        bsStyle: "primary",
        id: "formatting-split",
        active: blockType === 'unstyled',
        onClick: function onClick() {
          onBlockClicked('normal');
        }
      }, _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'unordered-list-item',
        onClick: function onClick() {
          onBlockClicked('unordered-list-item');
        }
      }, "Bullet List"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'ordered-list-item',
        onClick: function onClick() {
          onBlockClicked('ordered-list-item');
        }
      }, "Ordered List"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'blockquote',
        onClick: function onClick() {
          onBlockClicked('blockquote');
        }
      }, "Block Quote"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'header-one',
        onClick: function onClick() {
          onBlockClicked('header-one');
        }
      }, "Heading Large"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'header-two',
        onClick: function onClick() {
          onBlockClicked('header-two');
        }
      }, "Heading Medium"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'header-three',
        onClick: function onClick() {
          onBlockClicked('header-three');
        }
      }, "Heading Small"), _react["default"].createElement(_UiComponents.MenuItem, {
        active: blockType === 'code-block',
        onClick: function onClick() {
          onBlockClicked('code-block');
        }
      }, "Code Block")), ' ', _react["default"].createElement(_UiComponents.ButtonGroup, null, _react["default"].createElement(ToolbarButton, {
        onClick: function onClick(e) {
          _this2.setState({
            showLinkOverlay: !showLinkOverlay,
            popoverTarget: e.currentTarget
          }); // onLinkClicked();

        },
        disabled: selection.isCollapsed()
      }, _react["default"].createElement("i", {
        className: "fa fa-link"
      })), _react["default"].createElement(_UiComponents.Overlay, {
        placement: "bottom",
        target: popoverTarget,
        show: showLinkOverlay,
        container: this
      }, _react["default"].createElement(_UiComponents.Popover, {
        style: {
          marginLeft: 22,
          marginTop: 15
        },
        id: "link-popover"
      }, _react["default"].createElement(_UiComponents.FormGroup, {
        bsSize: "small",
        className: "clearfix",
        style: {
          padding: 0,
          margin: 0
        }
      }, _react["default"].createElement(_UiComponents.Col, {
        xs: 8,
        style: {
          padding: 0,
          margin: 0
        }
      }, _react["default"].createElement(_UiComponents.FormControl, {
        type: "text",
        placeholder: "http://",
        value: linkText,
        onChange: function onChange(e) {
          _this2.setState({
            linkText: e.target.value
          });
        }
      })), _react["default"].createElement(_UiComponents.Col, {
        xs: 4,
        style: {
          padding: 0,
          paddingLeft: 3
        }
      }, _react["default"].createElement(_UiComponents.ButtonGroup, null, _react["default"].createElement(ToolbarButton, {
        onClick: function onClick() {
          onLinkClicked(linkText);

          _this2.setState({
            showLinkOverlay: false
          });
        },
        disabled: linkText.length < 1,
        bsSize: "small",
        bsStyle: "success"
      }, _react["default"].createElement("i", {
        className: "fa fa-check"
      })), _react["default"].createElement(ToolbarButton, {
        onClick: function onClick() {
          _this2.setState({
            showLinkOverlay: false
          });
        },
        disabled: linkText.length < 1,
        bsSize: "small",
        bsStyle: "danger"
      }, _react["default"].createElement("i", {
        className: "fa fa-times"
      }))))))), _react["default"].createElement(ToolbarButton, {
        onClick: onUnlinkClicked,
        disabled: entity == null || entity.type !== 'LINK'
      }, _react["default"].createElement("i", {
        className: "fa fa-unlink"
      }))), ' ', _react["default"].createElement(_UiComponents.ButtonGroup, null, _react["default"].createElement(ToolbarButton, {
        onClick: onUndoClicked,
        disabled: undoSize === 0
      }, _react["default"].createElement("i", {
        className: "fa fa-undo"
      })), _react["default"].createElement(ToolbarButton, {
        onClick: onRedoClicked,
        disabled: redoSize === 0
      }, _react["default"].createElement("i", {
        className: "fa fa-repeat"
      }))));
    }
  }]);

  return Toolbar;
}(_react["default"].Component);

Toolbar.propTypes = {
  onInlineClicked: _propTypes["default"].func.isRequired,
  onBlockClicked: _propTypes["default"].func.isRequired,
  onUndoClicked: _propTypes["default"].func.isRequired,
  onRedoClicked: _propTypes["default"].func.isRequired,
  onLinkClicked: _propTypes["default"].func.isRequired,
  onUnlinkClicked: _propTypes["default"].func.isRequired,
  undoSize: _propTypes["default"].number.isRequired,
  redoSize: _propTypes["default"].number.isRequired,
  blockType: _propTypes["default"].string.isRequired,
  selection: _propTypes["default"].shape().isRequired,
  getEntityAtCursor: _propTypes["default"].func.isRequired
};
var _default = Toolbar;
exports["default"] = _default;