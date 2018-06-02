import React from 'react';
import { connect } from 'react-redux';
import TopicsListItem from './TopicsListItem';

const TopicsList = ({ topics }) => (
  <div>
    <h3>Your Topics</h3>
    {topics.length > 0 ? (
      topics.map(topic => (
        <li key={topic.id}>
          <TopicsListItem topic={topic} />
        </li>
      ))
    ) : (
      <p>No topics found.</p>
    )}
  </div>
);

const mapStateToProps = (state ) => ({
  topics: state.topics
});

export default connect(mapStateToProps)(TopicsList);
