import axios from 'axios';

// LOAD_USERS
export const loadUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => dispatch(loadUsersSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadUsersFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadUsersFail(err.request));
      } else {
        dispatch(loadUsersFail(err.message));
      }
    });
  dispatch({
    type: 'LOAD_USERS'
  });
};

// LOAD_USERS_SUCCESS
export const loadUsersSuccess = users => ({
  type: 'LOAD_USERS_SUCCESS',
  payload: users
});

// LOAD_USERS_FAIL
export const loadUsersFail = err => ({
  type: 'LOAD_USERS_FAIL',
  err
});
