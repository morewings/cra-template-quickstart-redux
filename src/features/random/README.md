## Random

Gets random number from random.org API and saves it to state. ALso saves request loading state.

## Selectors

### `useLoadingState`

Returns request loading state from the store. 

```javascript
import {useLoadingState} from 'features/random';

// Needs to be run from inside React component or other hook.
const {isLoading, hasError, isFulfilled} = useLoadingState();
```

### `useRandomNumber`

Returns random number value from the store

```javascript
import {useRandomNumber} from 'features/random';

// Needs to be run from inside React component or other hook.
const number = useRandomNumber();
```

## Action creators

### `useGetRandomNumberQuery`

Performs AJAX query to get random number from random.org. Records number and loading state data to the store;

```javascript
import {useGetRandomNumberQuery} from 'features/random';

// Needs to be run from inside React component or other hook.
const getNumber = useGetRandomNumberQuery();
const handleClick = () => {
  getNumber();
}
```

