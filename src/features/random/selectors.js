import {useSelector} from 'react-redux';

/**
 * Custom React Hooks to get random.org API loading state and response from the state.
 *
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useLoadingState = () => {
  const {isLoading, hasError, isFulfilled} = useSelector(state => state.random);
  return {isLoading, hasError, isFulfilled};
};

export const useRandomNumber = () => useSelector(state => state.random.number);
