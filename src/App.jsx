import React from 'react';
import './App.css';

import MarkdownInput from './modules/components/MarkdownInput';

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <MarkdownInput />
  </div>
);

export default App;
