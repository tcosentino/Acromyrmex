import React from 'react';
import PropTypes from 'prop-types';

const Mention = (props) => {
  const { mention, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className="mention">
        <div className="mention-thumb">{mention.get('stepNumber')}</div>

        <div className="mention-info">
          <div className="mention-header">{mention.get('name')}</div>

          <div className="mention-detail">{mention.get('stepName')}</div>
        </div>
      </div>
    </div>
  );
};

Mention.propTypes = {
  mention: PropTypes.shape().isRequired,
};

export default Mention;
