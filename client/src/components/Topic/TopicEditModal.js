import React from 'react';
import { connect } from 'react-redux';
import { editTopic } from '../../actions/user';
import Modal from '../Modal';

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
    if (this.state.title) {
      this.props.editTopic(this.props.topic._id, this.state);
    } else {
      this.setState(() => ({ title: this.props.topic.title }));
    }
    this.props.onRequestClose(this.state.title);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.handleRequestClose}
        headerText={this.props.topic && this.props.topic.title}
        headerIcon="ion-md-create"
      >
        <form className="TopicEditForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
            placeholder={this.props.topic && this.props.topic.title}
            onFocus={this.handleFocus}
            autoFocus
          />
        </form>
      </Modal>
    );
  }
}

export default connect(undefined, { editTopic })(TopicEditModal);
