import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import selectTopics from '../../selectors/topics';
import TopicsListItem from './TopicsListItem';

const TopicsList = ({ topics, username }) => (
  <div className="TopicsList">
    <ul>
      {topics.map(topic => (
        <li key={topic._id}>
          <TopicsListItem topic={topic} username={username} />
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username;

  if (username) {
    const user = state.users.users.find(user => user.username === username);
    return {
      topics: selectTopics(user.topics, state.filters.topics),
      username
    };
  } else {
    return {
      topics: selectTopics(state.user.user.topics, state.filters.topics)
    };
  }
};

export default withRouter(connect(mapStateToProps)(TopicsList));
