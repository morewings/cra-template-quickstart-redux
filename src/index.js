import React from 'react';
import ReactDOM from 'react-dom';
import withReduxFeatures from './withReduxFeatures';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

/** Wrap App component with store providers */
const WrappedApp = withReduxFeatures(App);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));

/**
 * If you want your app to work offline and load faster,
 * you can change unregister() to register() below.
 * Note this comes with some pitfalls.
 * @see https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
