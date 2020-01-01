import React from 'react';
import wrapHoc from 'components/SampleHOC';

const Sample = props => <div>Hello I am wrapped!</div>;

export default wrapHoc()(Sample);
