import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Values } from 'redux-form-website-template';
import 'normalize-scss/sass/_normalize.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import store from './store';
import SimpleForm from './examples/MarkdownInput/SimpleForm';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <SimpleForm onSubmit={() => {}} />
      <Values form="simple" />
    </div>
  </Provider>,
  rootEl,
);
