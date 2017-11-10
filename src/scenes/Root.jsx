import React from 'react';

import Todo from './Todo';
import logo from '../images/logo.svg';
import './Root.css';

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <Todo />
  </div>
);

export default App;
