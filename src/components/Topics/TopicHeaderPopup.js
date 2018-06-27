import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeTopic } from '../../actions/topics';

class TopicHeaderPopup extends React.Component {

  handleRemove = () => {
    if (window.confirm(`Remove topic ${this.props.topic.name}?`)) {
      this.props.removeTopic(this.props.topic);
      this.props.history.goBack();
    } else {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="TopicHeaderPopup">
        <div className="TopicHeaderPopup__menu">
          <div
            className="TopicHeaderPopup__menuItem"
            onClick={this.props.openTopicEditModal}
          >
            <div className="TopicHeaderPopup__menuItemIcon">
              <div className="icon ion-md-create" />
            </div>
            <div className="TopicHeaderPopup__menuItemText">
              Edit Topic
            </div>
          </div>
          <div
            className="TopicHeaderPopup__menuItem"
            onClick={this.handleRemove}
          >
            <div className="TopicHeaderPopup__menuItemIcon">
              <div className="icon ion-md-trash" />
            </div>
            <div className="TopicHeaderPopup__menuItemText">
              Delete Topic
            </div>
          </div>
        </div>
        <div className="TopicHeaderPopup__overlay" onClick={this.props.onClose} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeTopic: (topic) => dispatch(removeTopic(topic))
});

export default connect(undefined, mapDispatchToProps)(withRouter(TopicHeaderPopup));
