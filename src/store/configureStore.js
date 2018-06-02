import { createStore } from 'redux';
import topicsReducer from '../reducers/topics';

export default () => createStore(
  topicsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
