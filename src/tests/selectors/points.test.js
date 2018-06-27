import selectPoints from '../../selectors/points';
import points from '../fixtures/points';

test('should filter by text value', () => {
  const text = '452';
  const result = selectPoints(points, text);

  expect(result).toEqual([
    points[1]
  ]);
});
