import { createStore, combineReducers, applyMiddleware } from 'redux';
import filtersReducer from '../reducers/filters';
import notesReducer from '../reducers/notes';
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import thunk from 'redux-thunk';

export default () => createStore(
  combineReducers({
    filters: filtersReducer,
    notes: notesReducer,
    user: userReducer,
    users: usersReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
