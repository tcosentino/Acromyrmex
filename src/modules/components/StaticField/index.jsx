// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';

class StaticField extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.label !== nextProps.label || this.props.input.value !== nextProps.input.value;
  }

  render() {
    const {
      label,
      input: { value },
      meta,
      help,
      vertical,
      noLabel,
    } = this.props;

    return (
      <FormField
        inputClass="form-control-static"
        label={label}
        meta={meta}
        help={help}
        vertical={vertical}
        noLabel={noLabel}
      >
        {value}
      </FormField>
    );
  }
}

StaticField.propTypes = {
  meta: PropTypes.shape().isRequired,
  vertical: PropTypes.bool,
  noLabel: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

StaticField.defaultProps = {
  label: '',
  vertical: false,
  noLabel: false,
  help: '',
};

module.exports = StaticField;
