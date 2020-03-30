import React from 'react';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({store, Provider}) => WrappedComponent => props => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
);

export default withProvider;
