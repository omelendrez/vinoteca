import React from 'react'

const Modal = ({ isActive, close, children, handleOk, confirmText, cancelText }) => (
  <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <button className="delete" aria-label="close" onClick={() => close()}></button>
      </header>
      {children}
      <footer className="modal-card-foot">
        <button className="button is-danger" onClick={() => handleOk()}>{confirmText}</button>
        {cancelText ? <button className="button" onClick={() => close()}>{cancelText}</button> : null}
      </footer>
    </div>
  </div>
)

export default Modal