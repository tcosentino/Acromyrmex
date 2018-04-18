import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MarkdownInput from '../../modules/components/MarkdownInput';
import options from './options';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="markdown" label="Markdown" component={MarkdownInput} options={options} />
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
};

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
