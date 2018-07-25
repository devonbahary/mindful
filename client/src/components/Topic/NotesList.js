import React from 'react';
import { connect } from 'react-redux';
import selectPoints from '../../selectors/points';
import NotesListItem from './NotesListItem';

const NotesList = ({ topic, points, openNoteModal }) => (
  <div className="NotesList">
    {topic && points.length > 0 && (
      <ul className="NotesList__list">
        {points.map(point => (
          <li key={point.id}>
            <NotesListItem topic={topic} point={point} openNoteModal={openNoteModal} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  points: ownProps.topic ? selectPoints(ownProps.topic.points, state.filters.points) : []
});

export default connect(mapStateToProps)(NotesList);
