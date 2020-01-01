import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionTypes} from '../../Redux/counter';

const Counter = () => {
  const count = useSelector(state => state.count.value);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch({
      type: actionTypes.CHANGE_COUNTER,
      payload: count + 1,
    });
  }, [count, dispatch]);
  return (
    <div>
      <div>Counter component</div>
      <button type="button" onClick={handleClick}>
        Click me!
      </button>
      <div>You clicked: {count} times.</div>
    </div>
  );
};

export default Counter;
