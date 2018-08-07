import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

const CommonModal = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  headerText,
  headerPlaceholder,
  headerIcon,
  onHeaderTextChange,
  children
} = props) => (
  <ReactModal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    className="CommonModal"
    overlayClassName="CommonModalOverlay"
    onRequestClose={onRequestClose}
  >
    <header className="CommonModal__header">
      <input
        type="text"
        placeholder="Title"
        value={headerText}
        onChange={onHeaderTextChange}
        readOnly={!onHeaderTextChange}
      />
      <div className="CommonModal__headerIcon">
        <div className={`icon ${headerIcon}`} />
      </div>
    </header>
    {children}
    <footer className="CommonModal__footer">
      <button type="button" onClick={onRequestClose}>
        Close
      </button>
    </footer>
  </ReactModal>
);

export default CommonModal;
