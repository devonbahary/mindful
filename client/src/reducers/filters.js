const initialState = {
  topics: '',
  notes: '',
  users: ''
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'SET_TOPICS_FILTER':
      return {
        ...prevState,
        topics: action.text
      };
    case 'SET_USERS_FILTER':
      return {
        ...prevState,
        users: action.text
      };
    case 'SET_NOTES_FILTER':
      return {
        ...prevState,
        notes: action.text
      };
    default:
      return prevState;
  }
};
