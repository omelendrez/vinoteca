import React from 'react'
import { toTop } from '../../helpers'

const Footer = ({ onAdd, onTop }) => {
  return (
    <footer className="the-footer is-size-6 is-fullwidth has-background-white-ter">
      {onAdd ?
        <div className="footer-button" onClick={onAdd}>
          <i className="fas fa-plus-circle fa-2x"></i>
          <div className="button-text">Agregar</div>
        </div>
        : null}
      {onTop ?
        <div className="footer-button" onClick={() => toTop()}>
          <i className="fas fa-chevron-up fa-2x"></i>
          <div className="button-text">Subir</div>
        </div>
        : null}
    </footer>
  )
}

export default Footer