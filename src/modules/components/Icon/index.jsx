import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const { edit, help, close, filter, info, remove, upload, download, drag, cart } = props;

  const className = classNames('fa', {
    'fa-edit': edit,
    'fa-question-circle': help,
    'fa-close': close,
    'fa-filter': filter,
    'fa-trash': remove,
    'fa-upload': upload,
    'fa-download': download,
    'fa-info-circle': info,
    'fa-bars': drag,
    'fa-shopping-cart': cart,
  });

  return <i className={className} />;
};

Icon.propTypes = {
  edit: PropTypes.bool,
  help: PropTypes.bool,
  info: PropTypes.bool,
  close: PropTypes.bool,
  filter: PropTypes.bool,
  remove: PropTypes.bool,
  upload: PropTypes.bool,
  download: PropTypes.bool,
  drag: PropTypes.bool,
  cart: PropTypes.bool,
};

Icon.defaultProps = {
  edit: false,
  help: false,
  info: false,
  close: false,
  filter: false,
  remove: false,
  upload: false,
  download: false,
  drag: false,
  cart: false,
};

export default Icon;
