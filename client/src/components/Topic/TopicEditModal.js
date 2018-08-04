import React from 'react';
import { connect } from 'react-redux';
import { editTopic, editTopicLocal } from '../../actions/user';
import CommonModal from '../CommonModal';

class TopicEditModal extends React.Component {
  state = {
    title: this.props.topic ? this.props.topic.title : ''
  };

  handleTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleFocus = e => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    if (this.state.title && !this.props.topics.some(topic => topic.title === this.state.title)) {
      if (this.props.isSignedIn) {
        this.props.editTopic(this.props.topic._id, this.state);
      } else {
        this.props.editTopicLocal(this.props.topic._id, this.state);
      }
      this.props.onRequestClose(this.state.title);
    } else {
      this.setState(() => ({ title: this.props.topic.title }));
      this.props.onRequestClose();
    }
  };

  render() {
    const duplicateTitle = this.props.topics.some(topic => topic.title === this.state.title);
    return (
      <CommonModal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.handleRequestClose}
        headerText={this.props.topic && this.props.topic.title}
        headerIcon="ion-md-create"
      >
        <form className="TopicEditForm" onSubmit={this.handleSubmit}>
          <input
            className={duplicateTitle ? "TopicEditForm__input--duplicate" : "TopicEditForm__input"}
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
            placeholder={this.props.topic && this.props.topic.title}
            onFocus={this.handleFocus}
            autoFocus
          />
        </form>
      </CommonModal>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.user.user.topics,
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps, { editTopic, editTopicLocal })(TopicEditModal);
