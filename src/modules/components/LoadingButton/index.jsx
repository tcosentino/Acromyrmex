import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Loading from '../Loading';

const LoadingButton = props => {
  const { icon, label, loading, disabled, loadingLabel, ...btnProps } = props;

  return (
    <Button disabled={loading || disabled} {...btnProps}>
      {loading ? (
        <span>
          <Loading inline delay={false} />
          {icon && <img src={icon} alt="..." className="LoadingButton__icon" />}
          {loadingLabel || `${label}ing`}&hellip;
        </span>
      ) : (
        <span>
          {icon && <img src={icon} alt="..." className="LoadingButton__icon" />}
          {label}
        </span>
      )}
    </Button>
  );
};

LoadingButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // Defaults to label + 'ing' if not provided
  loadingLabel: PropTypes.string
};

LoadingButton.defaultProps = {
  icon: false,
  disabled: false,
  loadingLabel: ''
};

export default LoadingButton;
