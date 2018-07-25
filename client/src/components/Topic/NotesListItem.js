import React from 'react';

class NotesListItem extends React.Component {
  handleOpenNoteModal = (e) => this.props.openNoteModal(e, this.props.point);

  render() {
    return (
      <div className="NotesListItem" onClick={this.handleOpenNoteModal}>
        {this.props.point.name && (
          <header className="NotesListItem__header">{this.props.point.name}</header>
        )}
        <div className="NotesListItem__body">
          {this.props.point.type === 'note' ? (
            this.props.point.text
          ) : (
            <ul className="NotesListItem__list">
              {this.props.point.bullets.map((bullet, index) => (
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
  }
}


export default NotesListItem;
