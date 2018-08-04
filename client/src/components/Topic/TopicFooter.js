import React from 'react';
import NoteModal from './NoteModal';

const TopicFooter = (props) => (
  <footer className="TopicFooter">
    <div className="TopicFooter__textBox" onClick={() => props.openNoteModal(undefined, undefined, { type: 'note' })}>
      Add note..
    </div>
    <button
      className="TopicFooter__button"
      type="button"
      onClick={() => props.openNoteModal(undefined, undefined, { type: 'list' })}
    >
      <div className="icon ion-md-list" />
    </button>
  </footer>
);

export default TopicFooter;
