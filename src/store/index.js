import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { metricsReducer } from './metrics/reducers';

const rootReducer = combineReducers({
  metrics: metricsReducer
});

const configureStore = () =>
  createStore(rootReducer, devToolsEnhancer({}));

export default configureStore;
