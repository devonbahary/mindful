import pointsReducer from '../../reducers/points';
import points from '../fixtures/points';

test('should add topic to state', () => {
  const point = {
    text: 'Sold over 1.3 million copies.'
  };
  const action = {
    type: 'ADD_TOPIC_POINT',
    point
  };
  const state = pointsReducer(points, action);
  expect(state).toEqual([
    ...points,
    point
  ]);
});

test('should edit topic in state', () => {
  const updates = {
    text: 'Sold over 1.3 million copies.'
  };
  const action = {
    type: 'EDIT_TOPIC_POINT',
    id: points[0].id,
    updates
  };
  const state = pointsReducer(points, action);
  expect(state).toEqual([
    {
      ...points[0],
      text: updates.text
    },
    points[1],
    points[2],
    points[3]
  ]);
});

test('should remove topic from state', () => {
  const id = points[3].id;
  const action = {
    type: 'REMOVE_TOPIC_POINT',
    id
  };
  const state = pointsReducer(points, action);
  expect(state).toEqual([
    points[0],
    points[1],
    points[2]
  ]);
});
