const initialState = {
  user: {
    topics: []
  },
  isLoading: false,
  loadErr: undefined,
  isSignedIn: false
};

export default (prevState = initialState, action) => {
  let user;
  switch(action.type) {
    case 'LOG_IN_USER':
      return {
        ...prevState,
        isLoading: true,
        loadErr: undefined
      };
    case 'UPDATE_USER':
      return {
        ...prevState,
        user: action.payload,
        isLoading: false,
        isSignedIn: true
      };
    case 'UPDATE_USER_FAIL':
      return {
        ...prevState,
        isLoading: false,
        loadErr: action.err
      };
    case 'LOG_OUT_USER':
      return {
        ...prevState,
        user: {
          topics: []
        },
        isSignedIn: false
      };
    case 'UPDATE_USER_LOCAL':
      return {
        ...prevState,
        user: action.user
      };
    case 'ADD_TOPIC_LOCAL':
      user = {
        ...prevState.user,
        topics: [ ...prevState.user.topics, action.topic ]
      };
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...prevState,
        user
      };
    case 'EDIT_TOPIC_LOCAL':
      user = {
        ...prevState.user,
        topics: prevState.user.topics.map(topic => topic._id === action.id ? {
          ...topic,
          ...action.updates
        } : topic)
      };
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...prevState,
        user
      };
    case 'REMOVE_TOPIC_LOCAL':
      user = {
        ...prevState.user,
        topics: prevState.user.topics.filter(topic => topic._id !== action.id)
      };
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...prevState,
        user
      };
    default:
      return prevState;
  }
};
