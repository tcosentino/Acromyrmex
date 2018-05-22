// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import { FormGroup, ControlLabel, HelpBlock, Col, InputGroup } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import HoverHelp from '../HoverHelp';

const FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/;

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  field.foreach((prop) => {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false;
    }
  });

  return true;
}

class FormField extends React.Component {
  /**
   * Perform shallow equals comparison to determine if the props of the context
   * form field component have changed, with special-case handling for the "field"
   * prop, provided by redux-form.
   * Use this as shouldComponentUpdate() on components which compose a
   * FormField in their render() method and they will only re-render when
   * necessary.
   */
  static shouldFormFieldUpdate(nextProps) {
    const keys = Object.keys(this.props);
    const nextKeys = Object.keys(nextProps);
    if (keys.length !== nextKeys.length) return true;
    const nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (
        !nextHasOwnProperty(key) || key === 'field'
          ? !fieldShallowEquals(this.props[key], nextProps[key])
          : this.props[key] !== nextProps[key]
      ) {
        return true;
      }
    }
    return false;
  }

  calculateWidth() {
    const { noLabel, vertical, maxCols } = this.props;

    if (vertical) {
      return maxCols;
    }

    return noLabel ? maxCols : 8;
  }

  render() {
    const {
      help,
      label,
      prefix,
      meta: { error },
      loading,
      noLabel,
      maxCols,
      addonBefore,
      addonAfter,
      addonCustomBefore,
      addonCustomAfter,
    } = this.props;

    if (loading) {
      return (
        <span>
          <Loading /> Field Loading...
        </span>
      );
    }

    const validation = error ? 'error' : null;

    const width = this.calculateWidth();
    const offset = maxCols - width;

    let input = this.props.children;
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
      <FormGroup className="clearfix" validationState={validation}>
        {!noLabel && (
          <Col xs={maxCols} md={offset}>
            <ControlLabel>
              {prefix} {label}
              {'  '}
              {help && <HoverHelp help={help} />}
            </ControlLabel>
          </Col>
        )}
        <Col xs={maxCols} md={width}>
          {input}
        </Col>
        <Col xs={maxCols} md={width} mdOffset={offset}>
          {error && <HelpBlock>{error}</HelpBlock>}
        </Col>
      </FormGroup>
    );
  }
}

FormField.propTypes = {
  meta: PropTypes.shape(),

  // Help text to be displayed next to the label
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // Label text
  label: PropTypes.string,
  prefix: PropTypes.node,

  noLabel: PropTypes.bool,

  vertical: PropTypes.bool,

  maxCols: PropTypes.number,

  // Loading state
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,

  // addons for inputs
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
};

FormField.defaultProps = {
  help: '',
  label: '',
  type: 'text',
  prefix: null,
  vertical: false,
  maxCols: 12,

  meta: { error: '' },

  loading: false,
  noLabel: false,

  inputClass: '',
  field: {},
  inputProps: {},

  // addons for inputs
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
};

module.exports = FormField;
