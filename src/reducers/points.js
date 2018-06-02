const initialState = [];

export default (prevState = initialState, action) => {
  switch(action.type) {
    case 'ADD_TOPIC_POINT':
      return [
        ...prevState, action.point
      ];
    case 'EDIT_TOPIC_POINT':
      return prevState.map(point => point.id === action.id ? ({
        ...point,
        ...action.updates
      }) : point);
    case 'REMOVE_TOPIC_POINT':
      return prevState.filter(point => point.id !== action.id);
    default:
      return prevState;
  }
};
