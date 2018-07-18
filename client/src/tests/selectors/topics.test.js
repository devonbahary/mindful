import selectTopics from '../../selectors/topics';
import topics from '../fixtures/topics';

test('should filter by text value', () => {
  const text = 'Laws';
  const result = selectTopics(topics, text);

  expect(result).toEqual([
    topics[0]
  ]);
});
