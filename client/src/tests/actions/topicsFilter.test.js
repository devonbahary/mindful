import { setTopicsFilter } from '../../actions/topicsFilter';

// SET_TOPICS_FILTER
test('should set up set topic filter object', () => {
  const text = 'some text';
  const action = setTopicsFilter(text);

  expect(action).toEqual({
    type: 'SET_TOPICS_FILTER',
    text
  });
});
