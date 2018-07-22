const initialState = {
  users: [],
  loading: false,
  loadFail: false
};

export default(prevState = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING_USERS':
      return {
        ...prevState,
        loading: true,
        loadFail: false
      };
    case 'LOAD_USERS_SUCCESS':
      return {
        ...prevState,
        users: action.payload,
        loading: false
      };
    case 'LOAD_USERS_FAIL':
      return {
        ...prevState,
        loading: false,
        loadFail: true
      };
    default:
      return prevState;
  }
};
