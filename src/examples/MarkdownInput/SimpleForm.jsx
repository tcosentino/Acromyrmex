import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MarkdownInput from '../../modules/components/MarkdownInput';
import options from './options';
import TemplateInput from '../../modules/components/TemplateInput';
import SelectInput from '../../modules/components/SelectInput';
import DateInput from '../../modules/components/DateInput';
import TextInput from '../../modules/components/TextInput';
import FormulaInput from '../../modules/components/FormulaInput';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // options: [],
      options,
    };

    // simulate the options coming in delayed
    setTimeout(() => {
      // this.setState({ options });
      // this.props.change('markdown', 'new markdown value!');
    }, 2000);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="text" label="Text" component={TextInput} />
        </div>
        <div>
          <Field
            name="select"
            label="Select"
            component={SelectInput}
            options={[{ id: '1', name: 'option 1' }, { id: '2', name: 'option 2' }]}
          />
        </div>
        <div>
          <Field
            name="template"
            label="Template"
            component={TemplateInput}
            options={this.state.options}
          />
        </div>
        <div>
          <Field
            name="frequency"
            component={SelectInput}
            label="Frequency"
            multi
            options={[
              {
                id: 'w',
                name: 'weekly',
              },
              {
                id: 'd',
                name: 'daily',
              },
              {
                id: 'h',
                name: 'hourly',
              },
            ]}
          />
        </div>
        <div>
          <Field
            name="empty-template"
            label="Empty Template"
            component={TemplateInput}
            options={[]}
          />
        </div>
        <div>
          <Field
            name="equation"
            label="Equation"
            component={TemplateInput}
            options={[{ id: 'name', name: 'Name' }, { id: 'phone-number', name: 'Phone Number' }]}
            fixOptions={o => ({ ...o, textValue: `{${o.id}}` })}
          />
        </div>
        <div>
          <Field name="datetime" label="DateTime Input" component={DateInput} />
        </div>
        <div>
          <Field name="date" label="Date Input" component={DateInput} showTimeSelect={false} />
        </div>
        <div>
          <Field
            name="time"
            label="Time Input"
            component={DateInput}
            showTimeSelect
            showDateSelect={false}
          />
        </div>
        <div>
          <Field
            name="datetime-options"
            label="Date Input w/ options"
            component={DateInput}
            showTimeSelect
            options={this.state.options}
          />
        </div>
        <div>
          <Field
            name="date-options.value"
            label="Date Input w/ options"
            component={DateInput}
            showTimeSelect={false}
            options={this.state.options}
            addonCustomBefore={
              <Field
                name={'date-options.queryType'}
                component={SelectInput}
                disabled
                label={'Type of filter'}
                options={[{ id: '0', name: '=' }]}
                addon
              />
            }
          />
        </div>
        <div>
          <Field
            name="select-input"
            label="Select Input"
            component={SelectInput}
            options={[{ id: '1', name: 'true' }, { id: '2', name: 'false' }]}
            templateOptions={this.state.options}
            addonCustomBefore={
              <Field
                name={'date-options.queryType'}
                component={SelectInput}
                disabled
                label={'Type of filter'}
                options={[{ id: '0', name: '=' }]}
                addon
              />
            }
          />
        </div>
        <div>
          <Field
            name="markdown"
            label="Markdown"
            component={MarkdownInput}
            options={this.state.options}
          />
        </div>
        <div>
          <Field
            name="plainMarkdown"
            label="Plain Markdown"
            component={MarkdownInput}
            options={this.state.options}
            plainText
          />
        </div>
        <div>
          <Field
            name="formula"
            label="Formula"
            component={FormulaInput}
            attributes={[
              { id: 'employee-count', name: 'Employee Count', textValue: '#employee-count#' },
              { id: 'name', name: 'Name', textValue: '#name#' },
            ]}
            formulas={[
              { id: 'count', name: 'Count', textValue: '$COUNT$' },
              { id: 'sum', name: 'Sum', textValue: '$SUM$' },
            ]}
            options={this.state.options}
          />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

SimpleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  // change: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  initialValues: {
    formula: '$COUNT$(" #employee-count# = {dfasdferwegsf.replacement-workstation}")',
    plainMarkdown:
      'https://connect.oitc.ca/v4_6_release/services/system_io/router/openrecord.rails?',
    markdown:
      'sdfadf [asdfasdf](fasdfasf) adsfasdf [fasdf432](1231sadf) {dfasdfsdg3q34t.ip-address} {dfasdfsdg3q34t.mac-address} \n',
    'date-options': {
      value: '2018-05-24T05:12:08.848Z',
    },
  },
})(SimpleForm);
