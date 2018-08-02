import React from 'react';
import { connect } from 'react-redux';
import { addTopic } from '../../actions/user';

class AddTopic extends React.Component {
  state = {
    isOpen: false,
    text: '',
    isDisabled: false
  };

  componentDidMount() {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  handleTextChange = (e) => {
    const text = e.target.value;
    const alreadyHas = this.props.topics.some(topic => topic.title === text);
    this.setState(() => ({
      text,
      isDisabled: alreadyHas
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTopic({ title: this.state.text });
    this.setState(() => ({ text: '', isDisabled: false }));
    this.inputNode.blur();
  };

  handleFocus = () => {
    this.setState(() => ({ isOpen: true }));
  };

  handleBlur = () => {
    setTimeout(() => {
      if (this.mounted) {
        this.setState(() => ({
          isOpen: false,
          text: '',
          isDisabled: false
        }));
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
          disabled={this.state.isDisabled}
        >
          <div className="icon ion-md-add"></div>
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.user.user.topics
});

export default connect(mapStateToProps, { addTopic })(AddTopic);
