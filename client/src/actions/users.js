import axios from 'axios';

export const setLoadingUsers = () => ({
  type: 'SET_LOADING_USERS'
});

export const getUsers = () => dispatch => {
  dispatch(setLoadingUsers());
  axios
    .get('/api/users')
    .then(res => dispatch(loadUsersSuccess(res.data)))
    .catch(err => dispatch(loadUsersFail()));
};

export const loadUsersSuccess = (payload) => ({
  type: 'LOAD_USERS_SUCCESS',
  payload
});

export const loadUsersFail = () => ({
  type: 'LOAD_USERS_FAIL'
});
