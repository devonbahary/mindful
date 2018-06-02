import {
  fetchTopics,
  addTopic,
  editTopic,
  removeTopic,
  addTopicPoint,
  editTopicPoint,
  removeTopicPoint
} from '../../actions/topics';

// FETCH_TOPICS
test('should set up fetch topics object', () => {
    const action = fetchTopics();
    expect(action).toEqual({
      type: 'FETCH_TOPICS'
    });
});

// ADD_TOPIC
test('should set up add topic object', () => {
    const topic =  {
      name: 'Self-Reliance',
      description: 'A book written by Ralph Waldo Emerson.'
    };
    const action = addTopic(topic);
    expect(action).toEqual({
      type: 'ADD_TOPIC',
      topic: {
        ...topic,
        points: [],
        id: expect.any(String)
      }
    });
});

// EDIT_TOPIC
test('should set up edit topic object', () => {
  const id = '789ghi';
  const updates = {
    description: 'An 1841 essay written by American transcendentalist Ralph Waldo Emerson.'
  };
  const action = editTopic(id, updates);
  expect(action).toEqual({
    type: 'EDIT_TOPIC',
    updates,
    id
  });
});

// REMOVE_TOPIC
test('should set up remove topic object', () => {
  const topic = {
    name: 'Self-Reliance',
    description: 'A book written by Ralph Waldo Emerson',
    id: '789ghi'
  };
  const action = removeTopic(topic);
  expect(action).toEqual({
    type: 'REMOVE_TOPIC',
    id: topic.id
  });
});

// ADD_TOPIC_POINT
test('should set up add topic point object', () => {
  const point = {
    text: 'The Meditations is divided into 12 books that chronicle different periods of Marcus\' life.'
  };
  const topicId = '123abc';
  const action = addTopicPoint(topicId, point);
  expect(action).toEqual({
    type: 'ADD_TOPIC_POINT',
    topicId,
    point: {
      ...point,
      id: expect.any(String)
    }
  });
});

// EDIT_TOPIC_POINT
test('should set up edit topic point object', () => {
  const updates = {
    text: 'The Meditations is divided into 13 books that chronicle different periods of Marcus\' life.'
  };
  const topicId = '123abc';
  const id = '456def';
  const action = editTopicPoint(topicId, id, updates);
  expect(action).toEqual({
    type: 'EDIT_TOPIC_POINT',
    topicId,
    id,
    updates
  });
});

// REMOVE_TOPIC_POINT
test('should set up remove topic point object', () => {
  const topicId = '123abc';
  const point = {
    text: 'The Meditations is divided into 12 books that chronicle different periods of Marcus\' life.',
    id: '456def'
  };
  const action = removeTopicPoint(topicId, point);
  expect(action).toEqual({
    type: 'REMOVE_TOPIC_POINT',
    topicId,
    id: point.id
  });
});
