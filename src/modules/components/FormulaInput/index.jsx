// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { Col, HelpBlock } from '../../../utility/UiComponents';

import FormField from '../FormField';
import Editor from './FormulaEditor';

class FormulaInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };

    this.renderOption = this.renderOption.bind(this);
  }

  renderOption(option) {
    const { onTemplateClicked } = this.props;
    return (
      <Col
        xs={12}
        key={option.name}
        className="template-option"
        onClick={() => {
          onTemplateClicked(option);
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
      // autoFocus,
      addonAfter,
      addonBefore,
      addonCustomBefore,
      addonCustomAfter,
      attributes,
      formulas,
      input: { ...inputProps },
      meta,
      // disabled,
      maxCols
    } = this.props;
    let { type } = this.props;
    const { focused } = this.state;

    // alias
    if (type === 'datetime') {
      type = 'datetime-local';
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
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        addonCustomAfter={addonCustomAfter}
        addonCustomBefore={addonCustomBefore}
      >
        <Editor
          options={options}
          attributes={attributes}
          formulas={formulas}
          disableToolbar
          input={inputProps}
          className="template-input"
          fixOptions={o => ({ ...o })}
          onFocus={() => {
            this.setState({ focused: true });
          }}
          onBlur={() => {
            this.setState({ focused: false });
          }}
        />
        {/* the false here can be flipped to show it when developing */}
        {(focused || false) && options.length > 0 && (
          <HelpBlock>
            <span className="mention-formula display-only">$ Formula</span> |{' '}
            <span className="mention-attribute display-only"># Attribute</span> |{' '}
            <span className="mention-data display-only">{'{'} Data</span>
          </HelpBlock>
        )}
      </FormField>
    );
  }
}

FormulaInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

FormulaInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()), // data
  formulas: PropTypes.arrayOf(PropTypes.shape()), // formulas (COUNT, SUM)
  attributes: PropTypes.arrayOf(PropTypes.shape()), // attributes that can be used

  meta: PropTypes.shape().isRequired,
  onTemplateClicked: PropTypes.func,
  vertical: PropTypes.bool,
  // autoFocus: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  // disabled: PropTypes.bool,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
  maxCols: PropTypes.number
};

FormulaInput.defaultProps = {
  onTemplateClicked: () => {},
  help: '',
  options: [],
  formulas: [],
  attributes: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12
};

export default FormulaInput;
