import uuid from 'uuid';

// FETCH_TOPICS
export const fetchTopics = () => ({
  type: 'FETCH_TOPICS'
});

// ADD_TOPIC
export const addTopic = (topic = {
  name = '',
  description = ''
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
  text = ''
} = {}) => ({
  type: 'ADD_TOPIC_POINT',
  topicId,
  point: {
    ...point,
    id: uuid()
  }
});

// EDIT_TOPIC_POINT
export const editTopicPoint = (topicId, id, updates) => ({
  type: 'EDIT_TOPIC_POINT',
  topicId,
  id,
  updates
});

// REMOVE_TOPIC_POINT
export const removeTopicPoint = (topicId, { id }) => ({
  type: 'REMOVE_TOPIC_POINT',
  topicId,
  id
});
