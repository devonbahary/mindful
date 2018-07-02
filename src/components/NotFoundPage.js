import React from 'react';

class NotFoundPage extends React.Component {
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="NotFoundPage">
        <div className="NotFoundPage__contents">
          <div className="NotFoundPage__bgIcon ion-md-bulb" />
          <h1>404</h1>
          <p>We couldn't find the page you were looking for.</p>
          <button type="button" onClick={this.handleClick}>
            Return to Mindful
          </button>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
