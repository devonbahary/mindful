import { setTopicsFilter } from '../../actions/topicsFilter';
import topicsFilterReducer from '../../reducers/topicsFilter';

// @@INIT
test('should set up default filter values', () => {
  const state = topicsFilterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual('');
});

// SET_TOPICS_FILTER
test('should set by text', () => {
  const text = 'some text';
  const action = setTopicsFilter(text);
  const state = topicsFilterReducer(undefined, action);

  expect(state).toEqual(text);
});
