import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionTypes, selectors} from '../../Redux/counter';

const Counter = () => {
  /* Get count value from Redux store. We defined selector (state => state.counter.value) inside counter feature folder, to make component Redux agnostic */
  const count = useSelector(state => selectors.getCountValue(state));

  const dispatch = useDispatch();

  /* `useCallback` hook prevents component from unnecessary rerender, since otherwise child components may render unnecessarily due to the changed reference */
  const handleClick = useCallback(() => {
    dispatch({
      type: actionTypes.INCREMENT_COUNTER,
    });
  }, [dispatch]);

  return (
    <div>
      <div>Counter component</div>
      <button type="button" onClick={handleClick}>
        Click me!
      </button>
      <div>
        You clicked: <strong>{count}</strong> times.
      </div>
    </div>
  );
};

export default Counter;
