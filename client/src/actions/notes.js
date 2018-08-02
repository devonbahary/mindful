import axios from 'axios';

// LOAD_NOTES
export const loadNotes = userId => dispatch => {
  dispatch({
    type: 'LOAD_NOTES'
  });
  axios
    .get(`/api/notes/${userId}`)
    .then(res => dispatch(loadNotesSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadNotesFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadNotesFail(err.request));
      } else {
        dispatch(loadNotesFail(err.message));
      }
    });
};

// LOAD_NOTES_SUCCESS
export const loadNotesSuccess = notes => ({
  type: 'LOAD_NOTES_SUCCESS',
  payload: notes
});

// LOAD_NOTES_FAIL
export const loadNotesFail = err => ({
  type: 'LOAD_NOTES_FAIL',
  err
});

// ADD_NOTE
export const addNote = note => dispatch => {
  axios
    .post('/api/notes', note)
    .then(res => dispatch(addNoteSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadNotesFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadNotesFail(err.request));
      } else {
        dispatch(loadNotesFail(err.message));
      }
    });
};

// ADD_NOTE_SUCCESS
export const addNoteSuccess = note => ({
  type: 'ADD_NOTE_SUCCESS',
  payload: note
});

// EDIT_NOTE
export const editNote = (id, updates) => dispatch => {
  axios
    .patch(`/api/notes/${id}`, updates)
    .then(res => dispatch(editNoteSuccess(res.data)))
    .catch(err => {
      if (err.response) {
        dispatch(loadNotesFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadNotesFail(err.request));
      } else {
        dispatch(loadNotesFail(err.message));
      }
    });
};

// EDIT_NOTE_SUCCESS
export const editNoteSuccess = note => ({
  type: 'EDIT_NOTE_SUCCESS',
  payload: note
});

// REMOVE_NOTE
export const removeNote = id => dispatch => {
  axios
    .delete(`/api/notes/${id}`)
    .then(res => dispatch(removeNoteSuccess(id)))
    .catch(err => {
      if (err.response) {
        dispatch(loadNotesFail(err.response.statusText));
      } else if (err.request) {
        dispatch(loadNotesFail(err.request));
      } else {
        dispatch(loadNotesFail(err.message));
      }
    });
};

// REMOVE_NOTE_SUCCESS
export const removeNoteSuccess = id => ({
  type: 'REMOVE_NOTE_SUCCESS',
  id
});
