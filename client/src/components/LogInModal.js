import React from 'react';
import { connect } from 'react-redux';
import { logInUser, signUpUser } from '../actions/user';
import LoadingSpinner from './LoadingSpinner';
import ReactModal from 'react-modal';

class LogInModal extends React.Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    isSignUp: false,
    passwordErr: false
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isSignedIn && this.props.isSignedIn) {
      this.props.onRequestClose();
    }
    if (prevProps.isModalOpen && !this.props.isModalOpen) {
      this.setState(() => ({
        username: '',
        password: '',
        passwordRepeat: '',
        isSignUp: false,
        passwordErr: false
      }));
    }
  };

  handleUsernameChange = e => {
    const username = e.target.value.split('').filter(a => a.match(/^[a-zA-Z0-9_-]/)).join('');
    this.setState(() => ({ username }));
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  handlePasswordRepeatChange = e => {
    const passwordRepeat = e.target.value;
    this.setState(() => ({ passwordRepeat }));
  };

  handleToggleSignUp = () => this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({ passwordErr: false }));
    if (this.state.isSignUp && this.state.password !== this.state.passwordRepeat) {
      setTimeout(() => this.setState(() => ({ passwordErr: true})), 0);
    } else if (this.state.isSignUp) {
      this.props.signUpUser(this.state.username, this.state.password);
    } else {
      this.setState(() => ({ passwordErr: false }));
      this.props.logInUser(this.state.username, this.state.password);
    }
  };

  render() {
    const isDisabled = this.state.username.length < 2 || this.state.password.length < 6;
    return (
      <ReactModal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.onRequestClose}
        className="LogInModal"
        overlayClassName="LogInModalOverlay"
      >
        <header className="LogInModal__header">
          <div className={(this.state.isSignUp ? "icon--signUp" : "icon") + " icon ion-md-bulb"} />
        </header>
        <form
          className={this.props.isLoading ? "LogInModal__form--loading" : "LogInModal__form"}
          onSubmit={this.handleSubmit}
          ref={this.formRef}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            placeholder="username"
            minLength="2"
            maxLength="12"
            required
          />
          <input
            className={this.state.passwordErr ? "--passwordErr" : ""}
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            placeholder="password"
            minLength="6"
            required
          />
          {this.state.isSignUp && (
            <input
              className={this.state.passwordErr ? "--passwordErr" : ""}
              type="password"
              value={this.state.passwordRepeat}
              onChange={this.handlePasswordRepeatChange}
              placeholder="confirm"
              minLength="6"
              required
            />
          )}
          <input
            type="submit"
            value={this.state.isSignUp ? "signup" : "login"}
          />
          <p
            className="LogInModal__formToggle"
            onClick={this.handleToggleSignUp}
          >
            {this.state.isSignUp ? "Log In" : "Sign Up"}
          </p>
          {this.props.isLoading && <LoadingSpinner />}
        </form>
      </ReactModal>
    );
  };
};

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
  isLoading: state.user.isLoading
});

export default connect(mapStateToProps, { logInUser, signUpUser })(LogInModal);
