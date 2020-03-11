'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UiComponents = require('../../utility/UiComponents');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HoverHelp = function HoverHelp(_ref) {
  var help = _ref.help,
      position = _ref.position,
      name = _ref.name;

  var helpPopover = _react2.default.createElement(
    _UiComponents.Popover,
    { id: 'field-' + name + '-help' },
    help
  );

  return _react2.default.createElement(
    _UiComponents.OverlayTrigger,
    {
      trigger: ['hover', 'focus'],
      placement: position,
      overlay: helpPopover,
      rootClose: true
    },
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(_Icon2.default, { help: true })
    )
  );
};

// Define property types
HoverHelp.propTypes = {
  help: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  position: _propTypes2.default.string
};

HoverHelp.defaultProps = {
  position: 'right',
  name: 'na',
  help: ''
};

exports.default = HoverHelp;