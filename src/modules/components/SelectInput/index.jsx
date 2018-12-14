// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import './style.css';
import Loading from '../Loading';
import Select from '../TetheredSelectWrapper';
import ConfirmModal from '../ConfirmModal';

import FormField from '../FormField';
import Mention from '../MarkdownInput/Mention';

class SelectInput extends React.Component {
  static templateValueRenderer(option) {
    if (option.textValue) {
      return (
        <span className="form-control-template-value">
          {option.stepName} {'->'} {option.name}
        </span>
      );
    }

    return <span>{option.name}</span>;
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showModal: false,
      pendingVal: null,
    };

    this.templateOptionRenderer = this.templateOptionRenderer.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const myOptions = this.getOptions();
    const { enableEmpty, multi } = this.props;

    if (!this.valueInOptions() && !enableEmpty && myOptions[0] && !multi) {
      const firstOption = myOptions.find(o => !o.disabled) || myOptions[0];
      if (firstOption) {
        this.sendChange(firstOption.value);
      }
    }
  }

  getOptions() {
    const { options, enableAll, templateOptions } = this.props;
    const myOptions = options.map(item => ({
      ...item,
      value: item.id,
      label: item.name,
    }));

    if (enableAll) {
      myOptions.unshift({ value: 'all', label: 'All' });
    }

    if (templateOptions.length) {
      myOptions.push(...templateOptions.map(o => ({ ...o, label: o.name, value: o.textValue })));
    }

    return myOptions;
  }

  getValue() {
    const { input, jsonParse, multi } = this.props;
    let val = input.value;

    if (jsonParse) {
      val = JSON.stringify(input.value);
    }

    if (multi && val && _.isArray(val)) {
      val = val.join(',');
    }

    return val;
  }

  valueInOptions() {
    const myOptions = this.getOptions();
    const value = this.getValue();

    let valFound = false;
    _.each(myOptions, (option) => {
      valFound = valFound || option.value === value || JSON.stringify(option.value) === value;
    });

    return valFound;
  }

  // this is confusing.. needs to be cleared up
  handleChange(val) {
    const { jsonParse, multi } = this.props;

    let update = val;

    // for single select, comes back as val.value
    if (val && val.value) {
      update = val.value;
    }

    // for multi select, comes back as list of val.value
    if (multi) {
      update = update.map(value => value.value);
    }

    if (jsonParse) {
      try {
        update = JSON.parse(update);
      } catch (e) {
        // empty
      }
    }

    this.sendChange(update);
  }

  sendChange(value) {
    const { onChangeAction, input } = this.props;

    input.onChange(value);
    this.setState({ value });
    onChangeAction(value, input.name);
  }

  templateOptionRenderer(option) {
    const {
      input: { ...inputProps },
    } = this.props;
    if (option.textValue) {
      return (
        <Mention
          key={option.textValue}
          mention={option}
          onClick={() => {
            inputProps.onChange(option.textValue);
            this.setState({ optionSelected: true, open: false });
          }}
        />
      );
    }
    return <span>{option.name}</span>;
  }

  render() {
    const {
      label,
      help,
      loading,
      enableEmpty,
      addon,
      multi,
      meta,
      noLabel,
      disabled,
      vertical,
      optionRenderer,
      valueRenderer,
      input,
      input: { ...inputProps },
      confirm,
      confirmMessage,
      maxCols,
      addonAfter,
      addonBefore,
      addonCustomBefore,
      addonCustomAfter,
    } = this.props;

    const myOptions = this.getOptions();
    let value = this.getValue();
    const valFound = this.valueInOptions();

    if (!multi && !valFound && !loading) {
      value = enableEmpty || !myOptions[0] ? null : myOptions[0].value;
    }

    const selectInput = loading ? (
      <Loading />
    ) : (
      <Select
        {...inputProps}
        name={input.name}
        title={myOptions.length === 0 ? 'no available options' : ''}
        disabled={myOptions.length === 0 || disabled}
        value={value}
        onBlur={() => input.onBlur(input.value)}
        options={myOptions}
        clearable={!multi && enableEmpty}
        optionRenderer={optionRenderer || this.templateOptionRenderer}
        valueRenderer={valueRenderer || SelectInput.templateValueRenderer}
        joinValues
        multi={multi}
        onChange={(val) => {
          if (confirm) {
            this.setState({ showModal: true, pendingVal: val });
          } else {
            this.handleChange(val);
          }
        }}
        ref={(select) => {
          this.select = select;
        }}
      />
    );

    if (addon) {
      return selectInput;
    }

    return (
      <FormField
        label={label}
        vertical={vertical}
        meta={meta}
        help={help}
        noLabel={noLabel}
        loading={loading}
        maxCols={maxCols}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        addonCustomAfter={addonCustomAfter}
        addonCustomBefore={addonCustomBefore}
      >
        {selectInput}
        <ConfirmModal
          show={this.state.showModal}
          title="Confirm change"
          message={confirmMessage || 'Are you sure you want to delete this process?'}
          onConfirm={() => {
            this.handleChange(this.state.pendingVal);
            this.setState({ showModal: false, pendingVal: null });
          }}
          onCancel={() => {
            this.setState({ showModal: false, pendingVal: null });
          }}
        />
      </FormField>
    );
  }
}

SelectInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  multi: PropTypes.bool,
  loading: PropTypes.bool,
  addon: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape()),
  templateOptions: PropTypes.arrayOf(PropTypes.shape()),
  enableAll: PropTypes.bool,
  enableEmpty: PropTypes.bool,
  onChangeAction: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  confirmMessage: PropTypes.string,
  confirm: PropTypes.bool,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  jsonParse: PropTypes.bool,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  maxCols: PropTypes.number,
  addonAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  addonBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  addonCustomAfter: PropTypes.node,
  addonCustomBefore: PropTypes.node,
};

SelectInput.defaultProps = {
  name: '',
  help: '',
  label: '',
  value: '',
  confirmMessage: 'Are you sure you want to make this change?',
  confirm: false,
  noLabel: false,
  multi: false,
  loading: false,
  disabled: false,
  enableAll: false,
  enableEmpty: false,
  vertical: false,
  jsonParse: false,
  addon: false,
  options: [],
  optionRenderer: undefined,
  valueRenderer: undefined,
  templateOptions: [],
  maxCols: 12,
  onChangeAction: () => {},
  addonAfter: null,
  addonBefore: null,
  addonCustomAfter: null,
  addonCustomBefore: null,
};

module.exports = SelectInput;
