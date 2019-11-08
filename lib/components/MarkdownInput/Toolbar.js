'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ToolbarButton = function ToolbarButton(props) {
  var onClick = props.onClick,
      children = props.children,
      otherProps = _objectWithoutProperties(props, ['onClick', 'children']);

  return _react2.default.createElement(
    _reactBootstrap.Button,
    _extends({
      bsStyle: 'primary',
      bsSize: 'xsmall'
    }, otherProps, {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        onClick(e);
      }
    }),
    children
  );
};

ToolbarButton.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

    _this.state = {
      popoverTarget: null,
      showLinkOverlay: false,
      linkText: ''
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onInlineClicked = _props.onInlineClicked,
          onBlockClicked = _props.onBlockClicked,
          onUndoClicked = _props.onUndoClicked,
          onRedoClicked = _props.onRedoClicked,
          onLinkClicked = _props.onLinkClicked,
          onUnlinkClicked = _props.onUnlinkClicked,
          undoSize = _props.undoSize,
          redoSize = _props.redoSize,
          blockType = _props.blockType,
          selection = _props.selection,
          getEntityAtCursor = _props.getEntityAtCursor;
      var _state = this.state,
          linkText = _state.linkText,
          showLinkOverlay = _state.showLinkOverlay,
          popoverTarget = _state.popoverTarget;

      var entity = getEntityAtCursor();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.ButtonGroup,
          null,
          _react2.default.createElement(
            ToolbarButton,
            {
              onClick: function onClick() {
                onInlineClicked('BOLD');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-bold' })
          ),
          _react2.default.createElement(
            ToolbarButton,
            {
              onClick: function onClick() {
                onInlineClicked('ITALIC');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-italic' })
          ),
          _react2.default.createElement(
            ToolbarButton,
            {
              onClick: function onClick() {
                onInlineClicked('CODE');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-code' })
          )
        ),
        ' ',
        _react2.default.createElement(
          _reactBootstrap.ButtonGroup,
          null,
          _react2.default.createElement(
            ToolbarButton,
            {
              active: blockType === 'unordered-list-item',
              onClick: function onClick() {
                onBlockClicked('unordered-list-item');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-list-ul' })
          ),
          _react2.default.createElement(
            ToolbarButton,
            {
              active: blockType === 'ordered-list-item',
              onClick: function onClick() {
                onBlockClicked('ordered-list-item');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-list-ol' })
          ),
          _react2.default.createElement(
            ToolbarButton,
            {
              active: blockType === 'blockquote',
              onClick: function onClick() {
                onBlockClicked('blockquote');
              }
            },
            _react2.default.createElement('i', { className: 'fa fa-quote-right' })
          ),
          _react2.default.createElement(
            _reactBootstrap.SplitButton,
            {
              title: 'Normal',
              bsSize: 'xsmall',
              bsStyle: 'primary',
              id: 'formatting-split',
              active: blockType === 'unstyled',
              onClick: function onClick() {
                onBlockClicked('normal');
              }
            },
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              {
                active: blockType === 'header-one',
                onClick: function onClick() {
                  onBlockClicked('header-one');
                }
              },
              'Heading Large'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              {
                active: blockType === 'header-two',
                onClick: function onClick() {
                  onBlockClicked('header-two');
                }
              },
              'Heading Medium'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              {
                active: blockType === 'header-three',
                onClick: function onClick() {
                  onBlockClicked('header-three');
                }
              },
              'Heading Small'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              {
                active: blockType === 'code-block',
                onClick: function onClick() {
                  onBlockClicked('code-block');
                }
              },
              'Code Block'
            )
          )
        ),
        ' ',
        _react2.default.createElement(
          _reactBootstrap.ButtonGroup,
          null,
          _react2.default.createElement(
            ToolbarButton,
            {
              onClick: function onClick(e) {
                _this2.setState({
                  showLinkOverlay: !showLinkOverlay,
                  popoverTarget: e.currentTarget
                });
                // onLinkClicked();
              },
              disabled: selection.isCollapsed()
            },
            _react2.default.createElement('i', { className: 'fa fa-link' })
          ),
          _react2.default.createElement(
            _reactBootstrap.Overlay,
            {
              placement: 'bottom',
              target: popoverTarget,
              show: showLinkOverlay,
              container: this
            },
            _react2.default.createElement(
              _reactBootstrap.Popover,
              { style: { marginLeft: 22, marginTop: 15 }, id: 'link-popover' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { bsSize: 'small', className: 'clearfix', style: { padding: 0, margin: 0 } },
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { xs: 8, style: { padding: 0, margin: 0 } },
                  _react2.default.createElement(_reactBootstrap.FormControl, {
                    type: 'text',
                    placeholder: 'http://',
                    value: linkText,
                    onChange: function onChange(e) {
                      _this2.setState({ linkText: e.target.value });
                    }
                  })
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { xs: 4, style: { padding: 0, paddingLeft: 3 } },
                  _react2.default.createElement(
                    _reactBootstrap.ButtonGroup,
                    null,
                    _react2.default.createElement(
                      ToolbarButton,
                      {
                        onClick: function onClick() {
                          onLinkClicked(linkText);
                          _this2.setState({ showLinkOverlay: false });
                        },
                        disabled: linkText.length < 1,
                        bsSize: 'small',
                        bsStyle: 'success'
                      },
                      _react2.default.createElement('i', { className: 'fa fa-check' })
                    ),
                    _react2.default.createElement(
                      ToolbarButton,
                      {
                        onClick: function onClick() {
                          _this2.setState({ showLinkOverlay: false });
                        },
                        disabled: linkText.length < 1,
                        bsSize: 'small',
                        bsStyle: 'danger'
                      },
                      _react2.default.createElement('i', { className: 'fa fa-times' })
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            ToolbarButton,
            {
              onClick: onUnlinkClicked,
              disabled: entity == null || entity.type !== 'LINK'
            },
            _react2.default.createElement('i', { className: 'fa fa-unlink' })
          )
        ),
        ' ',
        _react2.default.createElement(
          _reactBootstrap.ButtonGroup,
          null,
          _react2.default.createElement(
            ToolbarButton,
            { onClick: onUndoClicked, disabled: undoSize === 0 },
            _react2.default.createElement('i', { className: 'fa fa-undo' })
          ),
          _react2.default.createElement(
            ToolbarButton,
            { onClick: onRedoClicked, disabled: redoSize === 0 },
            _react2.default.createElement('i', { className: 'fa fa-repeat' })
          )
        )
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  onInlineClicked: _propTypes2.default.func.isRequired,
  onBlockClicked: _propTypes2.default.func.isRequired,
  onUndoClicked: _propTypes2.default.func.isRequired,
  onRedoClicked: _propTypes2.default.func.isRequired,
  onLinkClicked: _propTypes2.default.func.isRequired,
  onUnlinkClicked: _propTypes2.default.func.isRequired,
  undoSize: _propTypes2.default.number.isRequired,
  redoSize: _propTypes2.default.number.isRequired,
  blockType: _propTypes2.default.string.isRequired,
  selection: _propTypes2.default.shape().isRequired,
  getEntityAtCursor: _propTypes2.default.func.isRequired
};

exports.default = Toolbar;