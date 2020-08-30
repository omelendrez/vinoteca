import React from 'react'

const Confirmodal = ({ title, isActive, close, children, handleOk, confirmText, cancelText, isLoading, bgColor }) => (
  <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className={`modal-card-head has-background-${bgColor ? bgColor : 'primary'}`} >
        <p className="modal-card-title has-text-white">{title}</p>
        <button className="delete" aria-label="close" onClick={e => close(e)}></button>
      </header>
      {children}
      <footer className="modal-card-foot">
        <button className={`button is-${bgColor ? bgColor : 'primary'} ${isLoading ? 'is-loading' : ''}`} onClick={() => handleOk()}>{confirmText}</button>
        {cancelText ? <button className="button" onClick={e => close(e)}>{cancelText}</button> : null}
      </footer>
    </div>
  </div>
)

export default Confirmodal