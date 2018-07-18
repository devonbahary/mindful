import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

const Modal = ({
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
    className="Modal"
    overlayClassName="ModalOverlay"
    onRequestClose={onRequestClose}
  >
    <header className="Modal__header">
      <input
        type="text"
        placeholder={headerPlaceholder ? headerPlaceholder.charAt(0).toUpperCase() + headerPlaceholder.substr(1) : headerText}
        value={headerText}
        onChange={onHeaderTextChange}
        readOnly={!onHeaderTextChange}
      />
      <div className="Modal__headerIcon">
        <div className={`icon ${headerIcon}`} />
      </div>
    </header>
    {children}
    <footer className="Modal__footer">
      <button type="button" onClick={onRequestClose}>
        Close
      </button>
    </footer>
  </ReactModal>
);

export default Modal;
