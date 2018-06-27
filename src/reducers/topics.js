import pointsReducer from './points';

const initialState = [];

export default (prevState = initialState, action) => {
  let topics;
  switch(action.type) {
    case 'FETCH_TOPICS':
      topics = JSON.parse(localStorage.getItem('topics'));
      return topics ? topics : [];
    case 'ADD_TOPIC':
      topics = [ ...prevState, action.topic ];
      localStorage.setItem('topics', JSON.stringify(topics));
      return topics;
    case 'EDIT_TOPIC':
      topics = prevState.map(topic => topic.id === action.id ? ({
        ...topic,
        ...action.updates
      }) : topic);
      localStorage.setItem('topics', JSON.stringify(topics));
      return topics;
    case 'REMOVE_TOPIC':
      topics = prevState.filter(topic => topic.id !== action.id);
      localStorage.setItem('topics', JSON.stringify(topics));
      return topics;
    case 'ADD_TOPIC_POINT':
    case 'EDIT_TOPIC_POINT':
    case 'REMOVE_TOPIC_POINT':
      topics = prevState.map(topic => topic.id === action.topicId ? ({
        ...topic,
        points: pointsReducer(topic.points, action)
      }) : topic);
      localStorage.setItem('topics', JSON.stringify(topics));
      return topics;
    default:
      return prevState;
  }
};
