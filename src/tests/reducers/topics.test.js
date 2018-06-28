import topicsReducer from '../../reducers/topics';
import topics from '../fixtures/topics';
import points from '../fixtures/points';
import {
  fetchTopics,
  addTopic,
  editTopic,
  removeTopic,
  addTopicPoint,
  editTopicPoint,
  removeTopicPoint
} from '../../actions/topics';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('topics', JSON.stringify(topics));
});

// @@INIT
test('should set up default state', () => {
  const state = topicsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

// FETCH_TOPICS
test('should fetch topics from localStorage', () => {
  const action = fetchTopics();
  const state = topicsReducer(undefined, action);
  expect(state).toEqual(topics);
});

// ADD_TOPIC
test('should add topic to state and save to localStorage', () => {
  const topic =  {
    name: 'Self-Reliance',
    description: 'A book written by Ralph Waldo Emerson.'
  };
  const action = addTopic(topic);
  const state = topicsReducer(undefined, action);
  expect(state).toEqual([{
    ...topic,
    points: [],
    id: expect.any(String)
  }]);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual([{
    ...topic,
    points: [],
    id: expect.any(String)
  }]);
});

// EDIT_TOPIC
test('should edit topic in state and update localStorage', () => {
  const id = topics[1].id;
  const updates = {
    description: 'A series of personal writings by Marcus Aurelius about Stoicism.'
  };
  const action = editTopic(id, updates);
  const state = topicsReducer(topics, action);

  const updatedTopics = [
    topics[0],
    {
      ...topics[1],
      ...updates
    }
  ];
  expect(state).toEqual(updatedTopics);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual(updatedTopics);
});

// REMOVE_TOPIC
test('should remove topic from state and update localStorage', () => {
  const topic = topics[0];
  const action = removeTopic(topic);
  const state = topicsReducer(topics, action);

  const updatedTopics = [topics[1]];
  expect(state).toEqual(updatedTopics);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual(updatedTopics);
});

// ADD_TOPIC_POINT
test('should add topic point to topic in state and save to localStorage', () => {
  const point = {
    text: 'Sold over 1.3 million copies.'
  };
  const topicId = topics[0].id;
  const action = addTopicPoint(topicId, point);
  const state = topicsReducer(topics, action);

  const updatedTopics = topics.map(topic => topic.id === topicId ? ({
    ...topic,
    points: [
      ...topics[0].points,
      {
        ...point,
        id: expect.any(String),
        lastUpdated: expect.any(Number)
      }
    ]
  }) : topic);
  expect(state).toEqual(updatedTopics);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual(updatedTopics);
});

// EDIT_TOPIC_POINT
test('should edit topic point in topic in state and update localStorage', () => {
  const updates = {
    text: 'Sold over 1.3 million copies.'
  };
  const topicId = topics[0].id;
  const id = topics[0].points[0].id;
  const action = editTopicPoint(topicId, id, updates);
  const state = topicsReducer(topics, action);

  const updatedTopics = topics.map(topic => topic.id === topicId ? ({
    ...topic,
    points: topic.points.map(point => point.id === id ? ({
      ...point,
      ...updates,
      lastUpdated: expect.any(Number)
    }) : point)
  }) : topic);
  expect(state).toEqual(updatedTopics);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual(updatedTopics);
});

// REMOVE_TOPIC_POINT
test('should remove topic point from topic in state and update localStorage', () => {
  const topicId = topics[0].id;
  const id = points[1].id;
  const action = removeTopicPoint(topicId, points[1]);
  const state = topicsReducer(topics, action);

  const updatedTopics = topics.map(topic => topic.id === topicId ? ({
    ...topic,
    points: topic.points.filter(point => point.id !== id)
  }) : topic);
  expect(state).toEqual(updatedTopics);

  const storage = JSON.parse(localStorage.getItem('topics'));
  expect(storage).toEqual(updatedTopics);
});
