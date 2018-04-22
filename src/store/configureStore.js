import { createStore } from 'redux';
import samplesReducer from '../reducers/samples';

export default () => createStore(
  samplesReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
