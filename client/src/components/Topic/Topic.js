import React from 'react';
import { connect } from 'react-redux';
import NotesList from './NotesList';
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import TopicEditModal from './TopicEditModal';
import NoteModal from './NoteModal';
import NotFoundPage from '../NotFoundPage';


class Topic extends React.Component {
  state = {
    isTopicEditModalOpen: false,
    isNoteModalOpen: false,
    topicPointModalPoint: undefined,
    topicPointModalType: 'note'
  };

  handleOpenTopicEditModal = () => this.setState(() => ({ isTopicEditModalOpen: true }));
  handleCloseTopicEditModal = () => this.setState(() => ({ isTopicEditModalOpen: false }));

  handleOpenNoteModal = (e, point, { type } = {}) => this.setState(() => ({
    isNoteModalOpen: true,
    topicPointModalPoint: point,
    topicPointModalType: type
  }));
  handleCloseNoteModal = () => this.setState(() => ({
    isNoteModalOpen: false,
    topicPointModalPoint: undefined,
    topicPointModalType: 'note',
    point: undefined
  }));

  render() {
    if (this.props.topic) {
      return (
        <div className="Topic">
          <TopicHeader topic={this.props.topic} openTopicEditModal={this.handleOpenTopicEditModal} />
          <NotesList topic={this.props.topic} openNoteModal={this.handleOpenNoteModal} />
          <TopicFooter topic={this.props.topic} openNoteModal={this.handleOpenNoteModal} />
          <TopicEditModal
            topic={this.props.topic}
            isModalOpen={this.state.isTopicEditModalOpen}
            onRequestClose={this.handleCloseTopicEditModal}
          />
          <NoteModal
            topic={this.props.topic}
            point={this.state.topicPointModalPoint}
            pointType={this.state.topicPointModalType}
            isModalOpen={this.state.isNoteModalOpen}
            onRequestClose={this.handleCloseNoteModal}
          />
          <div className="Topic__bgIcon ion-md-bulb" />
        </div>
      );
    } else {
      return <NotFoundPage />
    }
  }

}

const mapStateToProps = (state, props) => ({
  topic: state.topics.find(topic => topic.id === props.match.params.id)
});

export default connect(mapStateToProps)(Topic);
