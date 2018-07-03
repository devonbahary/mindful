import React from 'react';

class TopicPointItem extends React.Component {
  handleOpenTopicPointModal = (e) => this.props.openTopicPointModal(e, this.props.point);

  render() {
    return (
      <div className="TopicPointItem" onClick={this.handleOpenTopicPointModal}>
        {this.props.point.name && (
          <header className="TopicPointItem__header">{this.props.point.name}</header>
        )}
        <div className="TopicPointItem__body">
          {this.props.point.type === 'note' ? (
            this.props.point.text
          ) : (
            <ul className="TopicPointItem__list">
              {this.props.point.bullets.map((bullet, index) => (
                <li key={index} className="TopicPointItem__listItem">
                  <div className="TopicPointItem__listItemBullet">
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


export default TopicPointItem;
