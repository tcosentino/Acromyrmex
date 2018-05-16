// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import { InputGroup } from 'react-bootstrap';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import './style.css';
import FormField from '../FormField';

const DateInput = (props) => {
  const {
    help,
    label,
    prefix,
    noLabel,
    vertical,
    autoFocus,
    addonAfter,
    addonBefore,
    addonCustomBefore,
    addonCustomAfter,
    input: { ...inputProps },
    meta,
    disabled,
    dateFormat,
    maxCols,
    showTimeSelect,
  } = props;

  const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

  const calendar = (
    <Calendar
      autoFocus={autoFocus}
      // bsSize="small"
      format={dateFormat}
      timePicker={showTimeSelect ? timePickerElement : null}
      style={{ zIndex: 10000 }}
    />
  );

  console.log(disabled);

  let input = (
    <DatePicker
      animation="slide-up"
      disabled={disabled}
      calendar={calendar}
      value={inputProps.value ? moment(inputProps.value) : null}
      onChange={(date) => {
        inputProps.onChange(date ? moment(date).toDate() : '');
      }}
    >
      {({ value }) => (
        <span>
          <input
            placeholder="please select"
            disabled={disabled}
            readOnly
            tabIndex="-1"
            className="form-control form-control-no-readonly"
            value={(value && value.format(dateFormat)) || ''}
          />
        </span>
      )}
    </DatePicker>
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
  maxCols: PropTypes.number,

  // specific to the date picker
  dateFormat: PropTypes.string,
  showTimeSelect: PropTypes.bool,
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
  showTimeSelect: true,
};

export default DateInput;
