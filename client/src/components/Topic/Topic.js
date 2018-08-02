import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loadNotes } from '../../actions/notes';
import AppNav from '../AppNav';
import BackgroundIcon from '../BackgroundIcon';
import LoadingSpinner from '../LoadingSpinner';
import NoteModal from './NoteModal';
import NotesList from './NotesList';
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import TopicEditModal from './TopicEditModal';

class Topic extends React.Component {
  state = {
    isTopicEditModalOpen: false,
    isNoteModalOpen: false,
    noteModalNote: undefined,
    topicNoteModalType: 'note'
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.loadNotes(this.props.user._id);
    } else if (!this.props.user && !this.props.isLoading) {
      this.props.history.push('/users');
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user && !this.props.isLoading) {
      this.props.history.push('/users');
    }
    if (prevProps.user !== this.props.user) {
      if (!this.props.topic) {
        this.props.history.push(`/users/${this.props.user.username}`);
      } else if (this.props.user) {
        this.props.loadNotes(this.props.user._id);
      }
    }
  };

  handleOpenTopicEditModal = () => this.setState(() => ({ isTopicEditModalOpen: true }));

  handleCloseTopicEditModal = (newTopicTitle) => {
    this.setState(() => ({ isTopicEditModalOpen: false }));
    setTimeout(() => this.props.history.push(`/topics/${newTopicTitle}`), 0);
  };

  handleOpenNoteModal = (e, note, { type } = {}) => this.setState(() => ({
    isNoteModalOpen: true,
    noteModalNote: note,
    topicNoteModalType: type
  }));

  handleCloseNoteModal = () => this.setState(() => ({
    isNoteModalOpen: false,
    noteModalNote: undefined,
    topicNoteModalType: 'note',
    note: undefined
  }));

  render() {
    return (
      <div className="Topic">
        <TopicHeader openTopicEditModal={this.handleOpenTopicEditModal} />
        {this.props.isLoading || !this.props.user ? (
          <LoadingSpinner />
        ) : (
          <div>
            <NotesList openNoteModal={this.handleOpenNoteModal} />
            <BackgroundIcon iconClassName="ion-md-bulb" />
          </div>
        )}
        {this.props.isMe ? (
          <TopicFooter topic={this.props.topic} openNoteModal={this.handleOpenNoteModal} />
        ) : (
          <AppNav />
        )}
        <TopicEditModal
          topic={this.props.topic}
          isModalOpen={this.state.isTopicEditModalOpen}
          onRequestClose={this.handleCloseTopicEditModal}
        />
        <NoteModal
          topic={this.props.topic}
          note={this.state.noteModalNote}
          noteType={this.state.topicNoteModalType}
          isModalOpen={this.state.isNoteModalOpen}
          onRequestClose={this.handleCloseNoteModal}
        />
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username;
  const topicTitle = ownProps.match.params.title;

  if (username) {
    const user = state.users.users.find(user => user.username === username);

    return {
      isLoading: state.users.isLoading || state.notes.isLoading,
      topic: user ? user.topics.find(topic => topic.title === topicTitle) : undefined,
      user
    };
  } else {
    return {
      isLoading: state.user.isLoading,
      topic: state.user.user.topics.find(topic => topic.title === topicTitle),
      user: state.user.user,
      isMe: true
    };
  }
};

export default withRouter(connect(mapStateToProps, { loadNotes })(Topic));
