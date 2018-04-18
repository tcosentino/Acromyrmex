// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'react-bootstrap';
import 'draft-js/dist/Draft.css';
import Editor from './Editor';
import FormField from '../FormField';

class TemplateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  render() {
    const {
      help,
      label,
      prefix,
      noLabel,
      vertical,
      options,
      addonAfter,
      addonBefore,
      addonCustomBefore,
      addonCustomAfter,
      input: { ...inputProps },
      meta,
      maxCols,
    } = this.props;
    let { type } = this.props;

    // alias
    if (type === 'datetime') {
      type = 'datetime-local';
    }

    let input = <Editor input={inputProps} options={options} />;

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
      </FormField>
    );
  }
}

TemplateInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TemplateInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  vertical: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.shape()),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
  maxCols: PropTypes.number,
};

TemplateInput.defaultProps = {
  onTemplateClicked: () => {},
  help: '',
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
};

export default TemplateInput;
