import React from 'react';
import Counter from './components/Counter';
import classes from './App.module.css';

const App = () => (
  <div className={classes.container}>
    <Counter />
  </div>
);

export default App;
