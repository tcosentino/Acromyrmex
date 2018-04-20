// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputGroup } from 'react-bootstrap';

import FormField from '../FormField';

const TextInput = (props) => {
  const {
    help,
    label,
    prefix,
    noLabel,
    vertical,
    autoFocus,
    onPaste,
    addonAfter,
    addonBefore,
    addonCustomBefore,
    addonCustomAfter,
    input: { ...inputProps },
    meta,
    disabled,
    maxCols,
  } = props;
  let { type } = props;

  // alias
  if (type === 'datetime') {
    type = 'datetime-local';
  }

  let input = (
    <FormControl
      type={type}
      disabled={disabled}
      autoFocus={autoFocus}
      // bsSize="small"
      {...inputProps}
      onPaste={onPaste}
      onDrop={(e) => {
        if (e.dataTransfer.files.length) {
          inputProps.onDrop(e);
        }
      }}
    />
  );

  if (addonBefore || addonAfter) {
    input = (
      <InputGroup style={{ width: '100%' }}>
        {addonBefore && <InputGroup.Addon>{addonBefore}</InputGroup.Addon>}
        {input}
        {addonAfter && <InputGroup.Addon>{addonAfter}</InputGroup.Addon>}
      </InputGroup>
    );
  }

  if (addonCustomBefore || addonCustomAfter) {
    input = (
      <InputGroup style={{ width: '100%' }}>
        {addonCustomBefore}
        {input}
        {addonCustomAfter}
      </InputGroup>
    );
  }

  return (
    <FormField
      label={label}
      prefix={prefix}
      meta={meta}
      help={help}
      vertical={vertical}
      noLabel={noLabel}
      maxCols={maxCols}
    >
      {input}
    </FormField>
  );
};

TextInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TextInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  vertical: PropTypes.bool,
  autoFocus: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
  onPaste: PropTypes.func,
  maxCols: PropTypes.number,
};

TextInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  help: '',
  label: '',
  vertical: false,
  type: 'text',
  onPaste: () => {},
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12,
};

export default TextInput;
