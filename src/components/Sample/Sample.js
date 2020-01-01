import React from 'react';
import PropTypes from 'prop-types';

const Sample = props => (
  <div>
    <div>Hello from sample component!</div>
    <button type="button" onClick={props.sample}>
      Click me!
    </button>
    <div>You clicked: {props.increment} times.</div>
  </div>
);

Sample.propTypes = {
  sample: PropTypes.func.isRequired,
  increment: PropTypes.number.isRequired,
};

export default Sample;
