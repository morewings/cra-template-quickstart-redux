import React from 'react';
import Counter from 'components/Counter';
import Random from 'components/Random';
import classes from './App.module.css';

const App = () => (
  <div className={classes.container}>
    <Counter />
    <Random />
  </div>
);

export default App;
