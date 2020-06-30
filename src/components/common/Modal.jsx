import React from 'react'

const Modal = ({ isActive, close, title, message, confirmText, handleOk, cancelText, hasCancel }) => {

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={() => close()}></button>
        </header>
        <section className="modal-card-body has-text-black">
          {message}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={() => handleOk()}>{confirmText}</button>
          {hasCancel ? <button className="button" onClick={() => close()}>{cancelText}</button> : null}
        </footer>
      </div>
    </div>)
}

export default Modal