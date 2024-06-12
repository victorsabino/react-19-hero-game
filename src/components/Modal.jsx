import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, concept, onClose }) => {
  if (!isOpen || !concept) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{concept.symbol} {concept.name}</div>
        <div className="modal-description">{concept.description}</div>
        <pre className="modal-example"><code>{concept.example}</code></pre>
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
