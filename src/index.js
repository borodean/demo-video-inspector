import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';

import App from './components/App';
import configureStore from './store';

import './index.css';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

const Root = () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
