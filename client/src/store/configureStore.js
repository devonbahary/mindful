import { createStore, combineReducers } from 'redux';
import topicsReducer from '../reducers/topics';
import topicsFilterReducer from '../reducers/topicsFilter';
import pointsFilterReducer from '../reducers/pointsFilter';

export default () => createStore(
  combineReducers({
    topics: topicsReducer,
    topicsFilter: topicsFilterReducer,
    pointsFilter: pointsFilterReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
