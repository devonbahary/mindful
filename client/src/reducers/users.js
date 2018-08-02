const initialState = {
  users: [],
  isLoading: true,
  loadErr: undefined
};

export default (prevState = initialState, action) => {
  switch(action.type) {
    case 'LOAD_USERS':
      return {
        ...prevState,
        isLoading: true,
        loadErr: undefined
      };
    case 'LOAD_USERS_SUCCESS':
      return {
        ...prevState,
        users: action.payload,
        isLoading: false
      };
    case 'LOAD_USERS_FAIL':
      return {
        ...prevState,
        isLoading: false,
        loadErr: action.err
      };
    default:
      return prevState;
  }
};
