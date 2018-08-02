const initialState = {
  user: {
    topics: []
  },
  isLoading: false,
  loadErr: undefined
};

export default (prevState = initialState, action) => {
  switch(action.type) {
    case 'LOAD_USER':
      return {
        ...prevState,
        isLoading: true,
        loadErr: undefined
      };
    case 'LOAD_USER_SUCCESS':
      return {
        ...prevState,
        user: action.payload,
        isLoading: false
      };
    case 'LOAD_USER_FAIL':
      return {
        ...prevState,
        isLoading: false,
        loadErr: action.err
      };
    case 'ADD_TOPIC':
      if (!prevState.topics.some(topic => topic.title === action.topic.title)) {
        topics = [ ...prevState.topics, action.topic ];
        localStorage.setItem('topics', JSON.stringify(topics));
        return {
          ...prevState,
          topics
        };
      } else {
        return prevState;
      }
    case 'EDIT_TOPIC':
      topics = prevState.topics.map(topic => topic._id === action.id ? (
        {
          ...topic,
          ...action.updates
        }
      ) : topic);
      localStorage.setItem('topics', JSON.stringify(topics));
      return {
        ...prevState,
        topics
      };
    case 'REMOVE_TOPIC':
      topics = prevState.topics.filter(topic => topic._id === action.id);
      localStorage.setItem('topics', JSON.stringify(topics));
      return {
        ...prevState,
        topics
      };
    default:
      return prevState;
  }
};
