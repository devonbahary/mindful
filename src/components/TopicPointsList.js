import React from 'react';
import TopicPointItem from './TopicPointItem';

const TopicPointsList = ({ topic }) => (
  <div>
    {topic && topic.points.length > 0 ? (
      <ul>
        {topic.points.map(point => (
          <li key={point.id}>
            <TopicPointItem topic={topic} point={point} />
          </li>
        ))}
      </ul>
    ) : (
      <p>No points found.</p>
    )}
  </div>
);

export default TopicPointsList;
