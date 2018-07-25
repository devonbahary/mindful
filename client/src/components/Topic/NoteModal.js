import React from 'react';
import { connect } from 'react-redux';
import { addTopicPoint, editTopicPoint, removeTopicPoint } from '../../actions/topics';
import Textarea from 'react-textarea-autosize';
import ConfirmModal from './ConfirmModal';
import Modal from '../Modal';
import _ from 'lodash';
import moment from 'moment';

class NoteModal extends React.Component {
  state = {
    name: this.props.point ? this.props.point.name : '',
    type: this.props.point ? this.props.point.type : this.props.pointType,
    text: this.props.point ? this.props.point.text : '',
    bullets: this.props.point ? this.props.point.bullets : [],
    isDeleteNoteModalOpen: false
  };

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  handleTextChange = (e) => {
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
    if (this.props.point) {
      this.setState(() => ({
        name: this.props.point.name,
        type: this.props.point.type,
        text: this.props.point.text,
        bullets: this.props.point.bullets
      }));
    } else {
      this.setState(() => ({
        type: this.props.pointType
      }));
    }
  };

  handleAddBullet = (e) => {
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

  handleFocus = (e) => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleRequestClose();
  };

  openDeleteNoteModal = () => this.setState(() => ({ isDeleteNoteModalOpen: true }));

  handleRequestCloseDeleteNoteModal = () => this.setState(() => ({ isDeleteNoteModalOpen: false }));

  handleConfirmDeleteNoteModal = () => {
    this.props.removeTopicPoint();
    this.props.onRequestClose();
    this.setState(() => ({
      name: '',
      text: '',
      bullets: [],
      isDeleteNoteModalOpen: false
    }));
  };

  handleRequestClose = () => {
    const point = {
      name: this.state.name,
      type: this.state.type,
      text: this.state.type === 'note' ? this.state.text : undefined,
      bullets: this.state.type === 'list' ? this.state.bullets : undefined
    };
    const prevPoint = this.props.point ? {
      name: this.props.point.name,
      type: this.props.point.type,
      text: this.props.point.text,
      bullets: this.props.point.bullets
    } : undefined;
    if (!this.props.point || !_.isEqual(prevPoint, point)) {
      if (this.props.point && (this.props.point.type === 'note' ? this.state.text.length > 0 : this.state.bullets.length > 0)) {
        this.props.editTopicPoint(point);
      } else if ((this.state.type === 'note' && this.state.text.length > 0) || (this.state.type === 'list' && this.state.bullets.length > 0)) {
        this.props.addTopicPoint(point);
      }
    }
    this.setState(() => ({ name: '', text: '', bullets: [] }));
    this.props.onRequestClose();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onAfterOpen={this.handleAfterOpen}
        onRequestClose={this.handleRequestClose}
        onHeaderTextChange={this.handleNameChange}
        headerText={this.state.name}
        headerPlaceholder={this.state.type}
        headerIcon="ion-md-bulb"
      >
        <form className="NoteForm" onSubmit={this.handleSubmit}>
          {this.state.type === 'note' && (
            <Textarea
              placeholder="Lorem Ipsum.."
              value={this.state.text}
              onChange={this.handleTextChange}
              onFocus={this.handleFocus}
              autoFocus={!this.props.point}
            />
          )}
          {this.state.type === 'list' && (
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
                  autoFocus={!this.props.point}
                />
              </li>
            </ul>
          )}
        </form>
        {this.props.point && (
          <footer className="NoteForm__footer">
            <div className="NoteForm__footerButton" onClick={this.openDeleteNoteModal}>
              <div className="icon ion-md-trash" />
            </div>
            <div className="NoteForm__footerInfoBox">
              Edited {moment(this.props.point.lastUpdated).fromNow()}
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTopicPoint: (point) => dispatch(addTopicPoint(ownProps.topic.id, point)),
  editTopicPoint: (updates) => dispatch(editTopicPoint(ownProps.topic.id, ownProps.point.id, updates)),
  removeTopicPoint: () => dispatch(removeTopicPoint(ownProps.topic.id, ownProps.point))
});

export default connect(undefined, mapDispatchToProps)(NoteModal);
