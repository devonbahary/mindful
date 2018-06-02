import React from 'react';
import { Link } from 'react-router-dom';

const TopicsListItem = ({ topic }) => (
  <span>
    <Link to={`/topics/${topic.id}`}>
      {topic.name}
    </Link>
    {topic.description && ` [${topic.description}]`}
    <ul>
      <li>{topic.points.length > 0 ? `${topic.points.length} ${topic.points.length > 1 ? 'points' : 'point'} recorded.` : 'No points yet.'}</li>
    </ul>
  </span>
);

export default TopicsListItem;
