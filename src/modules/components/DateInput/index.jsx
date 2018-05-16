// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { InputGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

import FormField from '../FormField';

const DateInput = (props) => {
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
    input: { value, ...inputProps },
    meta,
    disabled,
    dateFormat,
    maxCols,
  } = props;

  console.log(value);

  let input = (
    <DatePicker
      disabled={disabled}
      autoFocus={autoFocus}
      // bsSize="small"
      className="form-control"
      {...inputProps}
      selected={value ? moment(value) : null}
      dateFormat={dateFormat}
      onChange={(date) => {
        inputProps.onChange(moment(date).toDate());
      }}
      onBlur={(date) => {
        inputProps.onChange(moment(date.target.value, dateFormat).toDate());
      }}
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

DateInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

DateInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  vertical: PropTypes.bool,
  autoFocus: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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

  // specific to the date picker
  dateFormat: PropTypes.string,
};

DateInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  help: '',
  label: '',
  vertical: false,
  onPaste: () => {},
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12,
  dateFormat: 'LLL',
};

export default DateInput;
