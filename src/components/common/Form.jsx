import React from 'react'

const Form = ({ formHeader, children, handleSave, handleCancel }) => (
  <div className="card my-3">

    <header className="card-header has-background-link-dark">
      <p className="card-header-title has-text-white">{formHeader}</p>
    </header>

    <div className="card-content">
      <div className="content">
        {children}
      </div>
    </div>

    <footer className="card-footer">
      <a href="# " className="card-footer-item has-text-white has-background-info" onClick={handleSave}>Guardar</a>
      <a href="# " className="card-footer-item has-text-white has-background-danger" onClick={handleCancel}>Cancelar</a>
    </footer>

  </div>

)

export default Form