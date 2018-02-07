import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Icon from '../Icon';

const HoverHelp = ({ help, position, name }) => {
  const helpPopover = <Popover id={`field-${name}-help`}>{help}</Popover>;

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={position}
      overlay={helpPopover}
      rootClose
    >
      <span>
        <Icon help />
      </span>
    </OverlayTrigger>
  );
};

// Define property types
HoverHelp.propTypes = {
  help: PropTypes.string.isRequired,
  name: PropTypes.oneOfType(PropTypes.string, PropTypes.node),
  position: PropTypes.string
};

HoverHelp.defaultProps = {
  position: 'right',
  name: 'na'
};

export default HoverHelp;
