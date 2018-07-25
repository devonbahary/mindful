import React from 'react';
import { connect } from 'react-redux';
import selectTopics from '../../selectors/topics';
import TopicsListItem from './TopicsListItem';

const TopicsList = ({ topics }) => (
  <div className="TopicsList">
    <ul>
      {topics.map(topic => (
        <li key={topic.id}>
          <TopicsListItem topic={topic} />
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state ) => ({
  topics: selectTopics(state.topics, state.filters.topics)
});

export default connect(mapStateToProps)(TopicsList);
