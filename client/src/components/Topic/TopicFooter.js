import React from 'react';
import NoteModal from './NoteModal';

class TopicFooter extends React.Component {
  handleOpenNote = () => this.props.openNoteModal(undefined, undefined, { type: 'note' });

  handleOpenList = () => this.props.openNoteModal(undefined, undefined, { type: 'list' });

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
