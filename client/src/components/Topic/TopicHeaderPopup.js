import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeTopic, removeTopicLocal } from '../../actions/user';
import ConfirmModal from '../ConfirmModal';

class TopicHeaderPopup extends React.Component {
  state = {
    isDeleteTopicModalOpen: false
  };

  openDeleteTopicModal = () => this.setState(() => ({ isDeleteTopicModalOpen: true }));

  handleConfirmDeleteTopicModal = () => {
    if (this.props.isSignedIn) {
      this.props.removeTopic(this.props.topic._id);
    } else {
      this.props.removeTopicLocal(this.props.topic._id);
    }
    const username = this.props.match.params.username;
    if (!username) {
      this.props.history.push('/');
    } else {
      this.props.history.push(`/users/${username}`);
    }
  };

  handleRequestCloseDeleteTopicModal = () => {
    this.setState(() => ({ isDeleteTopicModalOpen: false }));
    this.props.onClose();
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
            onClick={this.openDeleteTopicModal}
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
        <ConfirmModal
          isOpen={this.state.isDeleteTopicModalOpen}
          onRequestClose={this.handleRequestCloseDeleteTopicModal}
          onConfirm={this.handleConfirmDeleteTopicModal}
          prompt="Delete this topic?"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const topicTitle = ownProps.match.params.title;
  const topic = state.user.user.topics.find(topic => topic.title === topicTitle);
  return {
    topic,
    isSignedIn: state.user.isSignedIn
  };
};

export default withRouter(connect(mapStateToProps, { removeTopic, removeTopicLocal })(TopicHeaderPopup));
