import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TopicsListItem = props => (
  <Link
    to={props.username ? `/users/${props.username}/topics/${props.topic.title}` : `/topics/${props.topic.title}`}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div className="TopicListItem">
      <div className="TopicListItem__title">
        {props.topic.title}
      </div>
      <div className="TopicListItem__button">
        <div className="icon ion-md-arrow-round-forward"></div>
      </div>
    </div>
  </Link>
);
export default TopicsListItem;
