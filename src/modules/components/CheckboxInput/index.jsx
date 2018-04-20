// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Checkbox, FormGroup, OverlayTrigger, HelpBlock, Popover } from 'react-bootstrap';

import FormField from '../FormField';

class CheckboxInput extends React.Component {
  componentWillMount() {
    const { input } = this.props;

    if (!input.value) {
      input.onChange(false);
    }
  }

  render() {
    const {
      help,
      label,
      prefix,
      noLabel,
      disabled,
      input: { ...inputProps },
      meta: { error },
    } = this.props;

    const helpPopover = <Popover id={`field-${inputProps.name}-help`}>{help}</Popover>;

    const validation = error ? 'error' : null;

    const offset = noLabel ? 0 : 4;
    const width = noLabel ? 12 : 8;
    const centerClass = noLabel ? 'text-center' : '';

    const { value } = inputProps;

    return (
      <FormGroup validationState={validation}>
        <Col xs={12} md={width} mdOffset={offset} className={centerClass}>
          <Checkbox
            inline
            {...inputProps}
            disabled={disabled}
            checked={
              (_.isString(value) && value === 'true') || (_.isBoolean(value) && inputProps.value)
            }
          >
            {!noLabel && (
              <span>
                {prefix} {label}{' '}
                {help && (
                  <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="right"
                    overlay={helpPopover}
                    rootClose
                  >
                    <i className="fa fa-question-circle" />
                  </OverlayTrigger>
                )}
              </span>
            )}
          </Checkbox>
        </Col>
        <Col xs={12} md={width} mdOffset={offset}>
          {error && <HelpBlock>{error}</HelpBlock>}
        </Col>
      </FormGroup>
    );
  }
}

CheckboxInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

CheckboxInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
};

CheckboxInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false,
  disabled: false,
};

export default CheckboxInput;
