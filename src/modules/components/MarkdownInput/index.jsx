// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { HelpBlock } from 'react-bootstrap';
import 'draft-js/dist/Draft.css';
import Editor from './Editor';
import FormField from '../FormField';

class MarkdownInput extends React.Component {
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
      plainText,
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
        help={help || "Press '{' to add data from previous steps."}
        vertical={vertical}
        noLabel={noLabel}
        maxCols={maxCols}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        addonCustomAfter={addonCustomAfter}
        addonCustomBefore={addonCustomBefore}
      >
        <Editor
          input={inputProps}
          options={options}
          className="markdown-input"
          onFocus={() => {
            this.setState({ focused: true });
          }}
          onBlur={() => {
            this.setState({ focused: false });
          }}
          plainText={plainText}
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

MarkdownInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

MarkdownInput.propTypes = {
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
  plainText: PropTypes.bool,
};

MarkdownInput.defaultProps = {
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
  plainText: false,
};

export default MarkdownInput;
