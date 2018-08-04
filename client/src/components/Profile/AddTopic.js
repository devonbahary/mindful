import React from 'react';
import { connect } from 'react-redux';
import { addTopic, addTopicLocal } from '../../actions/user';

class AddTopic extends React.Component {
  state = {
    isOpen: false,
    title: '',
    isDisabled: false
  };

  componentDidMount() {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  handleTitleChange = (e) => {
    const title = e.target.value.split('').filter(a => a.match(/[a-zA-Z0-9-_.+!*'() ]/)).join('');
    const alreadyHas = this.props.topics.some(topic => topic.title === title);
    this.setState(() => ({
      title,
      isDisabled: alreadyHas
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const topic = { title: this.state.title };
    if (this.props.isSignedIn) {
      this.props.addTopic(topic);
    } else {
      this.props.addTopicLocal(topic);
    }
    this.setState(() => ({ title: '', isDisabled: false }));
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
          title: '',
          isDisabled: false
        }));
      }
    }, 0);
  };

  render() {
    const isDuplicate = this.props.topics.some(topic => topic.title === this.state.title);
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
          className={isDuplicate ? "AddTopic__input--duplicateTitle" : "AddTopic__input"}
          ref={ref => this.inputNode = ref}
          value={this.state.title}
          onChange={this.handleTitleChange}
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
  topics: state.user.user.topics,
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps, { addTopic, addTopicLocal })(AddTopic);
