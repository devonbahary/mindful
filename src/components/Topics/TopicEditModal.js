import React from 'react';
import { connect } from 'react-redux';
import { editTopic } from '../../actions/topics';
import Modal from '../Modal';

class TopicEditModal extends React.Component {
  state = {
    name: this.props.topic ? this.props.topic.name : ''
  };

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  handleFocus = (e) => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    if (this.state.name) {
      this.props.editTopic(this.state);
    } else {
      this.setState(() => ({ name: this.props.topic.name }));
    }
    this.props.onRequestClose();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.handleRequestClose}
        headerText={this.props.topic && this.props.topic.name}
        headerIcon="ion-md-create"
      >
        <form className="TopicEditForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder={this.props.topic && this.props.topic.name}
            onFocus={this.handleFocus}
            autoFocus
          />
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  editTopic: (updates) => dispatch(editTopic(ownProps.topic.id, updates))
});

export default connect(undefined, mapDispatchToProps)(TopicEditModal);
