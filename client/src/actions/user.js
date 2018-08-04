import axios from 'axios';
import uuid from 'uuid';
import { browserHistory } from 'react-router';

export const logInUser = (username, password) => dispatch => {
  let authToken = localStorage.getItem('authToken');
  if (authToken) {
    dispatch({
      type: 'LOG_IN_USER'
    });

    axios.defaults.headers.common['authorization'] = JSON.parse(authToken);
    axios
      .get('/api/users/me')
      .then(res => dispatch(updateUser(res.data)))
      .catch(err => {
        if (err.response) {
          dispatch(updateUserFail(err.response.statusText));
        } else if (err.request) {
          dispatch(updateUserFail(err.request));
        } else {
          dispatch(updateUserFail(err.message));
        }
      });
  } else if (username && password) {
    dispatch({
      type: 'LOG_IN_USER'
    });

    axios
      .post('/api/users/login', { username, password })
      .then(res => {
        dispatch(updateUser(res.data));
        authToken = JSON.stringify(res.headers['authorization']);
        localStorage.setItem('authToken', authToken);
        axios.defaults.headers.common['authorization'] = JSON.parse(authToken);
      })
      .catch(err => {
        if (err.response) {
          dispatch(updateUserFail(err.response.statusText));
        } else if (err.request) {
          dispatch(updateUserFail(err.request));
        } else {
          dispatch(updateUserFail(err.message));
        }
      });
  } else {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(updateUserLocal(JSON.parse(user)));
    }
  }
};

export const signUpUser = (username, password) => dispatch => {
  dispatch({
    type: 'LOG_IN_USER'
  });

  axios
    .post('/api/users', { username, password })
    .then(res => {
      dispatch(updateUser(res.data));
      const authToken = JSON.stringify(res.headers['authorization']);
      localStorage.setItem('authToken', authToken);
      axios.defaults.headers.common['authorization'] = JSON.parse(authToken);
    })
    .catch(err => {
      if (err.response) {
        dispatch(updateUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(updateUserFail(err.request));
      } else {
        dispatch(updateUserFail(err.message));
      }
    });
};

const updateUser = user => ({
  type: 'UPDATE_USER',
  payload: user
});


const updateUserFail = err => ({
  type: 'UPDATE_USER_FAIL',
  err
});

export const logOutUser = () => dispatch => {
  const token = JSON.parse(localStorage.getItem('authToken'));
  axios
    .delete('/api/users/logout', { token })
    .then(res => {
      dispatch({
        type: 'LOG_OUT_USER'
      });
      localStorage.removeItem('authToken');
      dispatch(logInUser());
    });
};

// ADD_TOPIC
export const addTopic = topic => dispatch => {
  axios
    .post('/api/users/topics', topic)
    .then(res => dispatch(updateUser(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(updateUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(updateUserFail(err.request));
      } else {
        dispatch(updateUserFail(err.message));
      }
    });
};

// EDIT_TOPIC
export const editTopic = (id, updates) => dispatch => {
  axios
    .patch(`/api/users/topics/${id}`, updates)
    .then(res => dispatch(updateUser(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(updateUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(updateUserFail(err.request));
      } else {
        dispatch(updateUserFail(err.message));
      }
    });
};

// REMOVE_TOPIC
export const removeTopic = id => dispatch => {
  axios
    .delete(`/api/users/topics/${id}`)
    .then(res => dispatch(updateUser(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(updateUserFail(err.response.statusText));
      } else if (err.request) {
        dispatch(updateUserFail(err.request));
      } else {
        dispatch(updateUserFail(err.message));
      }
    });
};

// UPDATE_USER_LOCAL
export const updateUserLocal = user => dispatch => {
  dispatch({
    type: 'UPDATE_USER_LOCAL',
    user
  });
};

// ADD_TOPIC_LOCAL
export const addTopicLocal = topic => ({
  type: 'ADD_TOPIC_LOCAL',
  topic: {
    ...topic,
    _id: uuid()
  }
});

// EDIT_TOPIC_LOCAL
export const editTopicLocal = (id, updates) => ({
  type: 'EDIT_TOPIC_LOCAL',
  updates,
  id
});

// REMOVE_TOPIC_LOCAL
export const removeTopicLocal = id => ({
  type: 'REMOVE_TOPIC_LOCAL',
  id
});
