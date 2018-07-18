import React from 'react';
import ReactModal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, prompt }) => (
  <ReactModal
    isOpen={isOpen}
    className="ConfirmModal"
    overlayClassName="ConfirmModalOverlay"
    onRequestClose={onRequestClose}
  >
    <div className="ConfirmModal__body">
      {prompt}
    </div>
    <footer className="ConfirmModal__footer">
      <button
        className="ConfirmModal__footerButton--confirm"
        onClick={onConfirm}
        type="button"
      >
        Yes
      </button>
      <button
        className="ConfirmModal__footerButton"
        onClick={onRequestClose}
        type="button"
      >
        No
      </button>
    </footer>
  </ReactModal>
);

export default ConfirmModal;
