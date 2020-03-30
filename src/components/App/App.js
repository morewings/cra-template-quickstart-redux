import React from 'react';
import Counter from '../Counter';
import Random from '../Random';
import classes from './App.module.css';

/* Wrapper component, connects children to stores */
const App = () => (
  <div className={classes.container}>
    <Counter />
    <Random />
  </div>
);

export default App;
