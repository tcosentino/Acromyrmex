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
    >
      <FormControl componentClass="textarea" {...inputProps} />
    </FormField>
  );
};

TextAreaInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TextAreaInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool
};

TextAreaInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false
};

module.exports = TextAreaInput;
