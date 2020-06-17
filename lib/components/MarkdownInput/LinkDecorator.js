"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draftJsUtils = require("draft-js-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// from https://github.com/sstur/react-rte/blob/master/src/lib/LinkDecorator.js
function Link(_ref) {
  var contentState = _ref.contentState,
      entityKey = _ref.entityKey,
      children = _ref.children;

  var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
      url = _contentState$getEnti.url;

  return _react["default"].createElement("a", {
    href: url
  }, children);
}

Link.propTypes = {
  contentState: _propTypes["default"].shape().isRequired,
  children: _propTypes["default"].node.isRequired,
  entityKey: _propTypes["default"].string.isRequired
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

var _default = {
  strategy: findLinkEntities,
  component: Link
};
exports["default"] = _default;