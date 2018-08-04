const initialState = {
  notes: [],
  isLoading: false,
  loadErr: undefined
};

export default (prevState = initialState, action) => {
  let notes;
  switch(action.type) {
    case 'LOAD_NOTES':
      return {
        ...prevState,
        isLoading: true,
        loadErr: undefined
      };
    case 'LOAD_NOTES_SUCCESS':
      return {
        ...prevState,
        notes: action.payload,
        isLoading: false
      };
    case 'LOAD_NOTES_FAIL':
      return {
        ...prevState,
        isLoading: false,
        loadErr: action.err
      };
    case 'ADD_NOTE_SUCCESS':
      return {
        ...prevState,
        notes: [ ...prevState.notes, action.payload ]
      };
    case 'EDIT_NOTE_SUCCESS':
      const updatedNote = action.payload;
      return {
        ...prevState,
        notes: prevState.notes.map(note => note._id === updatedNote._id ? updatedNote : note)
      };
    case 'REMOVE_NOTE_SUCCESS':
      return {
        ...prevState,
        notes: prevState.notes.filter(note => note._id !== action.id)
      };
    case 'ADD_NOTE_LOCAL':
      notes = [ ...prevState.notes, action.note ];
      localStorage.setItem('notes', JSON.stringify(notes));
      return {
        ...prevState,
        notes
      };
    case 'EDIT_NOTE_LOCAL':
      notes = prevState.notes.map(note => note._id === action.id ? {
        ...note,
        ...action.updates
      } : note);
      localStorage.setItem('notes', JSON.stringify(notes));
      return {
        ...prevState,
        notes
      };
    case 'REMOVE_NOTE_LOCAL':
      notes = prevState.notes.filter(note => note._id !== action.id);
      localStorage.setItem('notes', JSON.stringify(notes));
      return {
        ...prevState,
        notes
      };
    default:
      return prevState;
  }
};
