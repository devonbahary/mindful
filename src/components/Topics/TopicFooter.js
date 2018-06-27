import React from 'react';
import TopicPointModal from './TopicPointModal';

class TopicFooter extends React.Component {
  handleOpenNote = () => this.props.openTopicPointModal(undefined, undefined, { type: 'note' });

  handleOpenList = () => this.props.openTopicPointModal(undefined, undefined, { type: 'list' });

  render() {
    return (
      <footer className="TopicFooter">
        <div className="TopicFooter__textBox" onClick={this.handleOpenNote}>
          Add note..
        </div>
        <button
          className="TopicFooter__button"
          type="button"
          onClick={this.handleOpenList}
        >
          <div className="icon ion-md-list" />
        </button>
      </footer>
    );
  }
}

export default TopicFooter;
