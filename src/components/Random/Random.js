import React from 'react';
import {
  useGetRandomNumberQuery,
  useRandomNumber,
  useLoadingState,
} from 'features/random';
import classes from './Random.module.css';

const Random = () => {
  /** Loading state of random.org request from Redux store */
  const {isLoading, hasError, isFulfilled} = useLoadingState();

  /** Random number value */
  const number = useRandomNumber();

  /** Create incrementCounter action, using custom hook from feature */
  const getNumber = useGetRandomNumberQuery();

  /** Define pristine state condition, when user didn't do any actions */
  const isPristine = !isLoading && !hasError && !isFulfilled;

  return (
    <div className={classes.counter}>
      <h2 className={classes.header}>Async Random</h2>
      <button
        disabled={isLoading}
        className={classes.button}
        type="button"
        onClick={getNumber}>
        Get random number
      </button>
      {isPristine && <div>Click the button to get random number</div>}
      {isLoading && <div>Getting number</div>}
      {isFulfilled && (
        <div>
          Number from random.org: <strong>{number}</strong>
        </div>
      )}
      {hasError && <div>Ups...</div>}
    </div>
  );
};

export default Random;
