import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { editTopic, removeTopic } from '../actions/topics';
import AddTopicPoint from './AddTopicPoint';
import TopicPointsList from './TopicPointsList';


class Topic extends React.Component {
  state = {
    name: this.props.topic ? this.props.topic.name: '',
    description: this.props.topic ? this.props.topic.description : '',
    isEdit: false
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onBack = () => this.props.history.goBack();

  onToggleEdit = () => this.setState((prevState) => ({ isEdit: !prevState.isEdit }));

  onEdit = (e) => {
    e.preventDefault();
    const updates = {
      name: this.state.name,
      description: this.state.description
    };
    this.props.editTopic(this.props.topic.id, updates);
    this.setState(() => ({ isEdit: false }));
  };

  onRemove = () => {
    if (window.confirm(`Remove topic ${this.props.topic.name}?`)) {
      this.props.removeTopic(this.props.topic);
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={this.onBack}
        >
          Back to Dashboard
        </button>
        <h3>// Topic</h3>
        {this.state.isEdit ? (
          <form onSubmit={this.onEdit}>
            <p><b>{this.props.topic.name}</b></p>
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
            <br/>
            <button type="submit">Save Changes</button>
            <button
              type="button"
              onClick={this.onToggleEdit}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p><b>{this.state.name}</b></p>
            <p>{this.state.description}</p>
            <button
              type="button"
              onClick={this.onToggleEdit}
            >
              Edit Topic
            </button>
          </div>
        )}

        <hr />
        <h4>Points</h4>
        <TopicPointsList topic={this.props.topic} />
        <hr />
        <AddTopicPoint topic={this.props.topic} />
        <hr />
        <button
          type="button"
          onClick={this.onRemove}
        >
          Delete Topic
        </button>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => ({
  topic: state.topics.find(topic => topic.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  editTopic: (id, updates) => dispatch(editTopic(id, updates)),
  removeTopic: (topic) => dispatch(removeTopic(topic))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topic));
