import React from 'react';
import { connect } from 'react-redux';
import { addTopic } from '../../actions/topics';

class AddTopic extends React.Component {
  state = {
    isOpen: false,
    text: ''
  };

  componentDidMount() {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTopic({ name: this.state.text });
    this.setState(() => ({ text: '' }));
    this.inputNode.blur();
  };

  handleFocus = () => {
    this.setState(() => ({ isOpen: true }));
  };

  handleBlur = () => {
    setTimeout(() => {
      if (this.mounted) {
        this.setState(() => ({ isOpen: false, text: '' }));
      }
    }, 0);
  };

  render() {
    return (
      <form
        className="AddTopic"
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      >
        {this.state.isOpen && (
          <div className="AddTopic__label">
            Title
          </div>
        )}
        <input
          id="title"
          type="text"
          className="AddTopic__input"
          ref={ref => this.inputNode = ref}
          value={this.state.text}
          onChange={this.handleTextChange}
          onFocus={this.handleFocus}
          placeholder={this.state.isOpen ? "" : "Add new topic"}
          required
        />
        <button
          type="submit"
          className="AddTopic__button"
        >
          <div className="icon ion-md-add"></div>
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTopic: (topic) => dispatch(addTopic(topic))
});

export default connect(undefined, mapDispatchToProps)(AddTopic);
