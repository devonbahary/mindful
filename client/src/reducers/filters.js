const initialState = {
  topics: '',
  points: ''
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'SET_TOPICS_FILTER':
      return {
        ...prevState,
        topics: action.text
      };
    case 'SET_POINTS_FILTER':
      return {
        ...prevState,
        points: action.text
      };
    default:
      return prevState;
  }
};
