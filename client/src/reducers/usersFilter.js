const initialState = '';

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS_FILTER':
      return action.text;
    default:
      return prevState;
  }
};
