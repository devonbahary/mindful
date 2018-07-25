import React from 'react';
import { connect } from 'react-redux';
import selectPoints from '../../selectors/points';
import TopicPointItem from './TopicPointItem';

const TopicPointsList = ({ topic, points, openTopicPointModal }) => (
  <div className="TopicPointsList">
    {topic && points.length > 0 && (
      <ul className="TopicPointsList__list">
        {points.map(point => (
          <li key={point.id}>
            <TopicPointItem topic={topic} point={point} openTopicPointModal={openTopicPointModal} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  points: ownProps.topic ? selectPoints(ownProps.topic.points, state.filters.points) : []
});

export default connect(mapStateToProps)(TopicPointsList);
