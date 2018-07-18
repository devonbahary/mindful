import { setPointsFilter } from '../../actions/pointsFilter';

// SET_POINTS_FILTER
test('should set up set point filter object', () => {
  const text = 'some text';
  const action = setPointsFilter(text);

  expect(action).toEqual({
    type: 'SET_POINTS_FILTER',
    text
  });
});
