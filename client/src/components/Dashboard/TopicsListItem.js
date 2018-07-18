import React from 'react';
import { withRouter } from 'react-router';

class TopicsListItem extends React.Component {
  handleClick = () => {
    this.props.history.push(`/topics/${this.props.topic.id}`);
  };

  render() {
    return (
      <div
        className="TopicListItem"
        onClick={this.handleClick}
      >
        <div className="TopicListItem__title">
          {this.props.topic.name}
        </div>
        <div className="TopicListItem__button">
          <div className="icon ion-md-arrow-round-forward"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopicsListItem);
