import {useSelector} from 'react-redux';

/**
 * Custom React Hook to get count value from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const useCountValue = () => useSelector(state => state.count.value);

export default useCountValue;
