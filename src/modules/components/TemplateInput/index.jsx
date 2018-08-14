// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { Col, HelpBlock } from 'react-bootstrap';

import FormField from '../FormField';
import Editor from '../MarkdownInput/Editor';

class TemplateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
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
      // autoFocus,
      addonAfter,
      addonBefore,
      addonCustomBefore,
      addonCustomAfter,
      input: { ...inputProps },
      meta,
      // disabled,
      maxCols,
    } = this.props;
    let { type } = this.props;

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
          disableToolbar
          input={inputProps}
          className="template-input"
          fixOptions={this.props.fixOptions}
          onFocus={() => {
            this.setState({ focused: true });
          }}
          onBlur={() => {
            this.setState({ focused: false });
          }}
        />
        {/* the false here can be flipped to show it when developing */}
        {(this.state.focused || false) &&
          options.length > 0 && (
            <HelpBlock>{"Press '{' to add data from previous steps."}</HelpBlock>
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
  // autoFocus: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.shape()),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  // disabled: PropTypes.bool,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
  maxCols: PropTypes.number,
  fixOptions: PropTypes.func,
};

TemplateInput.defaultProps = {
  onTemplateClicked: () => {},
  disabled: false,
  help: '',
  autoFocus: false,
  options: [],
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
  maxCols: 12,
  fixOptions: undefined,
};

export default TemplateInput;
