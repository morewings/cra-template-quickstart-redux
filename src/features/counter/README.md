## Counter

Stores value in the Redux state and increments by 1.

## Selectors

### `useCountValue`

Returns count value from the store.

```javascript
import {useCountValue} from 'features/counter';

// Needs to be run from inside React component or other hook.
const count = useCountValue();
```

## Action creators

### `useIncrementCounter`

Increment stored count value by one.

```javascript
import {useIncrementCounter} from 'features/counter';

// Needs to be run from inside React component or other hook.
const incrementCounter = useIncrementCounter();
const handleClick = () => {
  useIncrementCounter();
}
```

