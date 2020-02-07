import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FormulaInput from '../../modules/components/FormulaInput';
import startingOptions from './options';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // options: [],
      options: startingOptions
    };

    // simulate the options coming in delayed
    setTimeout(() => {
      // this.setState({ options });
      // this.props.change('markdown', 'new markdown value!');
    }, 2000);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { options } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        {/* <div>
          <Field
            name="plainMarkdown"
            label="Plain Markdown"
            component={MarkdownInput}
            options={options}
            plainText
          />
        </div> */}
        <div>
          <Field
            name="formula"
            label="Formula"
            component={FormulaInput}
            enableEmpty
            attributes={[
              { id: 'employee-count', name: 'Employee Count', textValue: '#employee-count#' },
              { id: 'name', name: 'Name', textValue: '#name#' }
            ]}
            formulas={[
              { id: 'count', name: 'Count', textValue: '$COUNT$' },
              { id: 'sum', name: 'Sum', textValue: '$SUM$' }
            ]}
            options={options}
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
  submitting: PropTypes.bool.isRequired
  // change: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  initialValues: {
    plainMarkdown: '{dfasdfsdg3q34t.ip-address} {dfasdfsdg3q34t.mac-address} '
  }
})(SimpleForm);
