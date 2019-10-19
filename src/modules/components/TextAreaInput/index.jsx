// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import FormField from '../FormField';

const TextAreaInput = props => {
  const {
    help,
    label,
    prefix,
    noLabel,
    disabled,
    vertical,
    input: { ...inputProps },
    meta
  } = props;

  return (
    <FormField
      label={label}
      prefix={prefix}
      meta={meta}
      help={help}
      noLabel={noLabel}
      vertical={vertical}
    >
      <FormControl componentClass="textarea" disabled={disabled} {...inputProps} />
    </FormField>
  );
};

TextAreaInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TextAreaInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  disabled: PropTypes.bool,
  noLabel: PropTypes.bool,
  vertical: PropTypes.bool
};

TextAreaInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false,
  disabled: false,
  vertical: false
};

module.exports = TextAreaInput;
