'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJsUtils = require('draft-js-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Link(props) {
  var _props$contentState$g = props.contentState.getEntity(props.entityKey).getData(),
      url = _props$contentState$g.url;

  return _react2.default.createElement(
    'a',
    { href: url },
    props.children
  );
} // from https://github.com/sstur/react-rte/blob/master/src/lib/LinkDecorator.js


Link.propTypes = {
  contentState: _propTypes2.default.shape().isRequired,
  children: _propTypes2.default.node.isRequired,
  entityKey: _propTypes2.default.string.isRequired
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    if (entityKey != null) {
      var entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === _draftJsUtils.ENTITY_TYPE.LINK;
    }
    return false;
  }, callback);
}

exports.default = {
  strategy: findLinkEntities,
  component: Link
};