import React from 'react';
import Counter from '../Counter';
import classes from './App.module.css';

/* Wrapper component, connects children to stores */
const App = () => (
  <div className={classes.container}>
    <Counter />
  </div>
);

export default App;
