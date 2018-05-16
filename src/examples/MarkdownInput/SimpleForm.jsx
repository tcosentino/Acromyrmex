import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MarkdownInput from '../../modules/components/MarkdownInput';
import options from './options';
import TemplateInput from '../../modules/components/TemplateInput';
import SelectInput from '../../modules/components/SelectInput';
import DateInput from '../../modules/components/DateInput';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      // options,
    };

    // simulate the options coming in delayed
    setTimeout(() => {
      this.setState({ options });
    }, 300);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
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
            name="empty-template"
            label="Empty Template"
            component={TemplateInput}
            options={[]}
          />
        </div>
        <div>
          <Field name="date" label="Date Input" component={DateInput} />
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
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  initialValues: {
    markdown: 'sdfadf [asdfasdf](fasdfasf) adsfasdf {dfasdfsdg3q34t.ip-address} \n',
  },
})(SimpleForm);
