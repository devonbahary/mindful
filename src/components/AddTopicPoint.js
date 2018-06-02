import React from 'react';
import { connect } from 'react-redux';
import { addTopicPoint } from '../actions/topics';

class AddTopicPoint extends React.Component {
  state = {
    text: '',
    isOpen: false
  };

  onTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  onToggleOpen = () => this.setState((prevState) => ({
    text: '',
    isOpen: !prevState.isOpen
  }));

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addPoint({
      text: this.state.text
    });
    this.setState(() => ({
      text: '',
      isOpen: false
    }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.onToggleOpen}>
          {this.state.isOpen ? 'Close' : 'Add Point'}
        </button>
        {this.state.isOpen && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.text}
              onChange={this.onTextChange}
              autoFocus
              required
            />
            <button type="submit">
              Add Point
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPoint: (point) => dispatch(addTopicPoint(ownProps.topic.id, point))
});

export default connect(undefined, mapDispatchToProps)(AddTopicPoint);
