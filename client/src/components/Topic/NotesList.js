import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import selectNotes from '../../selectors/notes';
import NotesListItem from './NotesListItem';

const NotesList = props => (
  <div className="NotesList">
    <ul className="NotesList__list">
      {props.notes.map(note => (
        <li key={note._id}>
          <NotesListItem note={note} openNoteModal={props.openNoteModal} />
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username;
  const topicTitle = ownProps.match.params.title;

  let topic;
  if (username) {
    const user = state.users.users.find(user => user.username === username);
    topic = user.topics.find(topic => topic.title === topicTitle);

    return {
      notes: selectNotes(state.notes.notes.filter(note => note.topic_id === topic._id), state.filters.notes)
    };
  } else {
    topic = state.user.user.topics.find(topic => topic.title === topicTitle);

    return {
      notes: topic ? selectNotes(state.notes.notes.filter(note => note.topic_id === topic._id), state.filters.notes) : []
    };
  }
};

export default withRouter(connect(mapStateToProps)(NotesList));
