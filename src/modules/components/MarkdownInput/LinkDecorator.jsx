// from https://github.com/sstur/react-rte/blob/master/src/lib/LinkDecorator.js
import React from 'react';
import PropTypes from 'prop-types';
import { ENTITY_TYPE } from 'draft-js-utils';

function Link({ contentState, entityKey, children }) {
  const { url } = contentState.getEntity(entityKey).getData();
  return <a href={url}>{children}</a>;
}

Link.propTypes = {
  contentState: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  entityKey: PropTypes.string.isRequired
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      const entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === ENTITY_TYPE.LINK;
    }
    return false;
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link
};
