import uuid from 'uuid';
import moment from 'moment';

// FETCH_TOPICS
export const fetchTopics = () => ({
  type: 'FETCH_TOPICS'
});

// ADD_TOPIC
export const addTopic = (topic = {
  name = ''
} = {}) => ({
  type: 'ADD_TOPIC',
  topic: {
    ...topic,
    points: [],
    id: uuid()
  }
});

// EDIT_TOPIC
export const editTopic = (id, updates) => ({
  type: 'EDIT_TOPIC',
  updates,
  id
});

// REMOVE_TOPIC
export const removeTopic = ({ id }) => ({
  type: 'REMOVE_TOPIC',
  id
});

// ADD_TOPIC_POINT
export const addTopicPoint = (topicId, point = {
  name = '',
  type = 'note'
} = {}) => ({
  type: 'ADD_TOPIC_POINT',
  topicId,
  point: {
    ...point,
    id: uuid(),
    lastUpdated: moment.now()
  }
});

// EDIT_TOPIC_POINT
export const editTopicPoint = (topicId, id, updates) => ({
  type: 'EDIT_TOPIC_POINT',
  topicId,
  id,
  updates: {
    ...updates,
    lastUpdated: moment.now()
  }
});

// REMOVE_TOPIC_POINT
export const removeTopicPoint = (topicId, { id }) => ({
  type: 'REMOVE_TOPIC_POINT',
  topicId,
  id
});
