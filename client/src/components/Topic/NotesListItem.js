import React from 'react';

const NotesListItem = props => (
  <div className="NotesListItem" onClick={e => props.openNoteModal(e, props.note)}>
    {props.note.title && (
      <header className="NotesListItem__header">{props.note.title}</header>
    )}
    <div className="NotesListItem__body">
      {props.note.noteType === 'note' ? (
        props.note.text
      ) : (
        <ul className="NotesListItem__list">
          {props.note.bullets.map((bullet, index) => (
            <li key={index} className="NotesListItem__listItem">
              <div className="NotesListItem__listItemBullet">
                <div className="icon ion-md-square" />
              </div>
              <div>
                {bullet}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default NotesListItem;
