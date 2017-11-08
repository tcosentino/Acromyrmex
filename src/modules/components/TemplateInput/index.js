// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from "react";
import PropTypes from "prop-types";
// import { change }
import { FormControl, InputGroup, Col, Row, Panel } from "react-bootstrap";

import FormField from "../FormField";

class TemplateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };

    this.renderOption = this.renderOption.bind(this);
  }

  renderOption(option) {
    return (
      <Col
        xs={12}
        key={option.name}
        className="template-option"
        onClick={() => {
          this.props.onTemplateClicked(option);
        }}
      >
        {option.name}
      </Col>
    );
  }

  render() {
    const {
      help,
      label,
      prefix,
      noLabel,
      vertical,
      options,
      autoFocus,
      addonAfter,
      addonBefore,
      addonCustomBefore,
      addonCustomAfter,
      input: { ...inputProps },
      meta,
      disabled,
      maxCols
    } = this.props;
    let { type } = this.props;

    // alias
    if (type === "datetime") {
      type = "datetime-local";
    }

    let input = (
      <FormControl
        type={type}
        disabled={disabled}
        autoFocus={autoFocus}
        {...inputProps}
        onFocus={() => {
          this.setState({ focused: true });
        }}
        onBlur={() => {
          // this delay lets clicking the box work
          setTimeout(() => {
            this.setState({ focused: false });
          }, 250);
        }}
      />
    );

    if (addonBefore || addonAfter) {
      input = (
        <InputGroup>
          {addonBefore && <InputGroup.Addon>{addonBefore}</InputGroup.Addon>}
          {input}
          {addonAfter && <InputGroup.Addon>{addonAfter}</InputGroup.Addon>}
        </InputGroup>
      );
    }

    if (addonCustomBefore || addonCustomAfter) {
      input = (
        <InputGroup>
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
        {/* the false here can be flipped to show it when developing */}
        {(this.state.focused || false) && (
          <Panel
            header="Enter a value, or select an option from a previous step:"
            className="template-input-panel"
          >
            <Row className="option-scroller">
              {options.length < 1 && <Col xs={12}>No options!</Col>}
              {options.map(this.renderOption)}
            </Row>
          </Panel>
        )}
      </FormField>
    );
  }
}

TemplateInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TemplateInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  onTemplateClicked: PropTypes.func,
  vertical: PropTypes.bool,
  autoFocus: PropTypes.bool,
  help: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.shape()),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
  maxCols: PropTypes.number
};

TemplateInput.defaultProps = {
  onTemplateClicked: () => {},
  disabled: false,
  help: "",
  autoFocus: false,
  options: [],
  label: "",
  vertical: false,
  type: "text",
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12
};

export default TemplateInput;
