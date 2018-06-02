import React from 'react';
import { connect } from 'react-redux';
import { addTopic } from '../actions/topics';

class AddTopic extends React.Component {
  state = {
    name: '',
    description: '',
    isOpen: false
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onToggleOpen = () => this.setState((prevState) => ({
    isOpen: !prevState.isOpen,
    name: '',
    description: ''
  }));

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTopic({
      name: this.state.name,
      description: this.state.description
    });
    this.setState(() => ({
      name: '',
      description: '',
      isOpen: false
    }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.onToggleOpen}>
          {this.state.isOpen ? 'Close' : 'Add Topic'}
        </button>
        {this.state.isOpen && (
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              required
            />
            <br/>
            <label htmlFor="description">Description </label>
            <input
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
            <button type="submit">Add Topic</button>
          </form>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTopic: (topic) => dispatch(addTopic(topic))
});

export default connect(undefined, mapDispatchToProps)(AddTopic);
