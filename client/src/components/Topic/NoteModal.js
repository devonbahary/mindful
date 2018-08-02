import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addNote, editNote, removeNote } from '../../actions/notes';
import Textarea from 'react-textarea-autosize';
import ConfirmModal from './ConfirmModal';
import Modal from '../Modal';

class NoteModal extends React.Component {
  state = {
    title: this.props.note ? this.props.note.title : '',
    noteType: this.props.note ? this.props.note.noteType : this.props.noteType,
    text: this.props.note ? this.props.note.text : '',
    bullets: this.props.note ? this.props.note.bullets : [],
    isDeleteNoteModalOpen: false
  };

  handleTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleTextChange = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  handleBulletChange = (e, index) => {
    const text = e.target.value;
    this.setState((prevState) => ({
      bullets: prevState.bullets.map((bullet, i) => i === index ? text : bullet)
    }));
  };

  handleAfterOpen = () => {
    if (this.props.note) {
      this.setState(() => ({
        title: this.props.note.title,
        noteType: this.props.note.noteType,
        text: this.props.note.text,
        bullets: this.props.note.bullets
      }));
    } else {
      this.setState(() => ({
        noteType: this.props.noteType
      }));
    }
  };

  handleAddBullet = e => {
    const text = e.target.value;
    this.setState((prevState) => ({
      bullets: prevState.bullets.concat(text)
    }));
    setTimeout(() => this.lastTextAreaNode.focus(), 0);
  };

  handleBulletBlur = (e, index) => {
    const text = e.target.value;
    if (!text) {
      this.setState((prevState) => ({
        bullets: prevState.bullets.filter((bullet, i) => i !== index)
      }));
    }
  };

  handleFocus = e => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleRequestClose();
  };

  openDeleteNoteModal = () => this.setState(() => ({ isDeleteNoteModalOpen: true }));

  handleRequestCloseDeleteNoteModal = () => this.setState(() => ({ isDeleteNoteModalOpen: false }));

  handleConfirmDeleteNoteModal = () => {
    this.props.removeNote(this.props.note._id);
    this.props.onRequestClose();
    this.setState(() => ({
      title: '',
      text: '',
      bullets: [],
      isDeleteNoteModalOpen: false
    }));
  };

  handleRequestClose = () => {
    const note = {
      title: this.state.title,
      noteType: this.state.noteType,
      text: this.state.noteType === 'note' ? this.state.text : undefined,
      bullets: this.state.noteType === 'list' ? this.state.bullets : []
    };
    const prevNote = this.props.note ? {
      title: this.props.note.title,
      noteType: this.props.note.noteType,
      text: this.props.note.text,
      bullets: this.props.note.bullets
    } : undefined;
    if (!this.props.note || !_.isEqual(prevNote, note)) {
      if (this.props.note && (this.props.note.noteType === 'note' ? this.state.text.length > 0 : this.state.bullets.length > 0)) {
        this.props.editNote(this.props.note._id, note);
      } else if ((this.state.noteType === 'note' && this.state.text.length > 0) || (this.state.noteType === 'list' && this.state.bullets.length > 0)) {
        this.props.addNote({ ...note, topic_id: this.props.topic._id });
      }
    }
    this.setState(() => ({ title: '', text: '', bullets: [] }));
    this.props.onRequestClose();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onAfterOpen={this.handleAfterOpen}
        onRequestClose={this.handleRequestClose}
        onHeaderTextChange={this.handleTitleChange}
        headerText={this.state.title}
        headerPlaceholder={this.state.noteType}
        headerIcon="ion-md-bulb"
      >
        <form className="NoteForm" onSubmit={this.handleSubmit}>
          {this.state.noteType === 'note' && (
            <Textarea
              placeholder="Lorem Ipsum.."
              value={this.state.text}
              onChange={this.handleTextChange}
              onFocus={this.handleFocus}
              autoFocus={!this.props.note}
            />
          )}
          {this.state.noteType === 'list' && (
            <ul>
              {this.state.bullets.map((bullet, index) => (
                <li key={index} className="NoteForm__bullet">
                  <div className="NoteForm__bulletIcon">
                    <div className="icon ion-md-square" />
                  </div>
                  <Textarea
                    placeholder="List item.."
                    value={this.state.bullets[index]}
                    onChange={(e) => this.handleBulletChange(e, index)}
                    onFocus={this.handleFocus}
                    inputRef={ref => this.lastTextAreaNode = ref}
                    onBlur={(e) => this.handleBulletBlur(e, index)}
                  />
                </li>
              ))}
              <li className="NoteForm__bullet">
                <div className="NoteForm__bulletIcon">
                  <div className="icon ion-md-square" />
                </div>
                <Textarea
                  placeholder="List item.."
                  value=''
                  onChange={this.handleAddBullet}
                  autoFocus={!this.props.note}
                />
              </li>
            </ul>
          )}
        </form>
        {this.props.note && (
          <footer className="NoteForm__footer">
            {this.props.isMe && (
              <div className="NoteForm__footerButton" onClick={this.openDeleteNoteModal}>
                <div className="icon ion-md-trash" />
              </div>
            )}
            <div className="NoteForm__footerInfoBox">
              Edited {moment(this.props.note.lastUpdated).fromNow()}
            </div>
          </footer>
        )}
        <ConfirmModal
          isOpen={this.state.isDeleteNoteModalOpen}
          onRequestClose={this.handleRequestCloseDeleteNoteModal}
          onConfirm={this.handleConfirmDeleteNoteModal}
          prompt="Delete this note?"
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMe: !ownProps.match.params.username
});

export default withRouter(connect(mapStateToProps, { addNote, editNote, removeNote })(NoteModal));
