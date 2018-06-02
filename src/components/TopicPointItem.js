import React from 'react';
import { connect } from 'react-redux';
import { editTopicPoint, removeTopicPoint } from '../actions/topics';

class TopicPointItem extends React.Component {
  state = {
    text: this.props.point.text,
    isEdit: false
  };

  onToggleEdit = () => this.setState((prevState) => ({ isEdit: !prevState.isEdit }));

  onTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editPoint({
      text: this.state.text
    });
    this.setState(() => ({ isEdit: false }));
  };

  onRemove = () => {
    if (confirm(`Remove this point?\n\"${this.props.point.text}\"`)) {
      this.props.removePoint();
    }
  };

  render() {
    return (
      <div>
        {this.state.isEdit ? (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.text}
              onChange={this.onTextChange}
              autoFocus
              required
            />
            <button type="submit">
              Update
            </button>
            <button type="button" onClick={this.onToggleEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            {this.props.point.text}
            <button type="button" onClick={this.onToggleEdit}>
              Edit
            </button>
            <button type="button" onClick={this.onRemove}>
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  editPoint: (updates) => dispatch(editTopicPoint(ownProps.topic.id, ownProps.point.id, updates)),
  removePoint: () => dispatch(removeTopicPoint(ownProps.topic.id, ownProps.point))
});

export default connect(undefined, mapDispatchToProps)(TopicPointItem);
