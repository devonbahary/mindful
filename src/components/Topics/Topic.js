import React from 'react';
import { connect } from 'react-redux';
import TopicPointsList from './TopicPointsList';
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import TopicEditModal from './TopicEditModal';
import TopicPointModal from './TopicPointModal';


class Topic extends React.Component {
  state = {
    isTopicEditModalOpen: false,
    isTopicPointModalOpen: false,
    topicPointModalPoint: undefined,
    topicPointModalType: 'note'
  };

  handleOpenTopicEditModal = () => this.setState(() => ({ isTopicEditModalOpen: true }));
  handleCloseTopicEditModal = () => this.setState(() => ({ isTopicEditModalOpen: false }));

  handleOpenTopicPointModal = (e, point, { type } = {}) => this.setState(() => ({
    isTopicPointModalOpen: true,
    topicPointModalPoint: point,
    topicPointModalType: type
  }));
  handleCloseTopicPointModal = () => this.setState(() => ({
    isTopicPointModalOpen: false,
    topicPointModalPoint: undefined,
    topicPointModalType: 'note',
    point: undefined
  }));

  render() {
    return (
      <div className="Topic">
        <TopicHeader topic={this.props.topic} openTopicEditModal={this.handleOpenTopicEditModal} />
        <TopicPointsList topic={this.props.topic} openTopicPointModal={this.handleOpenTopicPointModal} />
        <TopicFooter topic={this.props.topic} openTopicPointModal={this.handleOpenTopicPointModal} />
        <TopicEditModal
          topic={this.props.topic}
          isModalOpen={this.state.isTopicEditModalOpen}
          onRequestClose={this.handleCloseTopicEditModal}
        />
        <TopicPointModal
          topic={this.props.topic}
          point={this.state.topicPointModalPoint}
          pointType={this.state.topicPointModalType}
          isModalOpen={this.state.isTopicPointModalOpen}
          onRequestClose={this.handleCloseTopicPointModal}
        />
      </div>
    );
  }

}

const mapStateToProps = (state, props) => ({
  topic: state.topics.find(topic => topic.id === props.match.params.id)
});

export default connect(mapStateToProps)(Topic);
