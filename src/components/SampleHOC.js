/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

const wrapHoc = options => WrappedComponent =>
  class Wrapper extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Prev props: ', prevProps);
    }

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const { extraProp, ...passThroughProps } = this.props; // eslint-disable-line

      // Inject props into the wrapped component. These are usually state values or
      // instance methods.
      const injectedProp = 'someStateOrInstanceMethod';
      // Pass props to wrapped component
      return (
        <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />
      );
    }
  };

export default wrapHoc;
