'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Mention = function Mention(props) {
  var mention = props.mention,
      parentProps = _objectWithoutProperties(props, ['mention']);

  // we don't want to pass some of these, but are not currently using them


  var transferProps = _extends({}, parentProps);
  delete transferProps.theme;
  delete transferProps.isFocused;
  delete transferProps.searchValue;

  return _react2.default.createElement(
    'div',
    transferProps,
    _react2.default.createElement(
      'div',
      { className: 'mention' },
      _react2.default.createElement(
        'div',
        { className: 'mention-thumb' },
        mention.get('stepNumber')
      ),
      _react2.default.createElement(
        'div',
        { className: 'mention-info' },
        _react2.default.createElement(
          'div',
          { className: 'mention-header' },
          mention.get('name')
        ),
        _react2.default.createElement(
          'div',
          { className: 'mention-detail' },
          mention.get('stepName')
        )
      )
    )
  );
};

Mention.propTypes = {
  mention: _propTypes2.default.shape().isRequired
};

exports.default = Mention;