/* eslint-disable */
import React from 'react';
import {useCountValue, useActions} from '../../features/counter';
import classes from './Random.module.css';

const Random = () => {
  // /**
  //  *  Get count value from Redux store. We defined selector
  //  *  (state => state.counter.value) inside counter feature folder,
  //  *  to make component global state agnostic
  //  */
  // const count = useCountValue();
  //
  // /** Create incrementCounter action, using custom hook from feature */
  // const {incrementCounter} = useActions();

  return (
    <div className={classes.counter}>
      <h2 className={classes.header}>Async Random</h2>
      <button
        className={classes.button}
        type="button"
        onClick={() => {}}>
        Get random number
      </button>
      <div>
        Number from random.org API: <strong>4</strong>
      </div>
    </div>
  );
};

export default Random;
