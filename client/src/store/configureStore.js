import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import topicsReducer from '../reducers/topics';
import topicsFilterReducer from '../reducers/topicsFilter';
import pointsFilterReducer from '../reducers/pointsFilter';
import usersReducer from '../reducers/users';
import usersFilterReducer from '../reducers/usersFilter';

export default () => createStore(
  combineReducers({
    topics: topicsReducer,
    topicsFilter: topicsFilterReducer,
    pointsFilter: pointsFilterReducer,
    users: usersReducer,
    usersFilter: usersFilterReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
