import axios from 'axios';
import { loadNotes } from './notes';
import { browserHistory } from 'react-router';

export const loadUser = () => dispatch => {
  dispatch({
    type: 'LOAD_USER'
  });
  const token = localStorage.getItem('authToken');
  if (token) {
    axios.defaults.headers.common['authorization'] = JSON.parse(token);
    axios
      .get('/api/users/me')
      .then(res => dispatch(loadUserSuccess(res.data)))
      .catch(err => {
        if (err.response) {
          dispatch(loadUserFail(err.response.statusText));
        } else if (err.request) {
          dispatch(loadUserFail(err.request));
        } else {
          dispatch(loadUserFail(err.message));
        }
      });
  }
};

const loadUserSuccess = user => dispatch => {
  dispatch({
    type: 'LOAD_USER_SUCCESS',
    payload: user
  });

  dispatch(loadNotes(user._id));
};

const loadUserFail = err => ({
  type: 'LOAD_USER_FAIL',
  err
});

// ADD_TOPIC
export const addTopic = topic => dispatch => {
  axios
    .post('/api/users/topics', topic)
    .then(res => dispatch(loadUserSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadUserFail(err.request));
      } else {
        dispatch(loadUserFail(err.message));
      }
    });
};

// EDIT_TOPIC
export const editTopic = (id, updates) => dispatch => {
  axios
    .patch(`/api/users/topics/${id}`, updates)
    .then(res => dispatch(loadUserSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadUserFail(err.request));
      } else {
        dispatch(loadUserFail(err.message));
      }
    });
};
