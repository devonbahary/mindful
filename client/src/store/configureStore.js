import { createStore, combineReducers } from 'redux';
import topicsReducer from '../reducers/topics';
import filtersReducer from '../reducers/filters';

export default () => createStore(
  combineReducers({
    topics: topicsReducer,
    filters: filtersReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
