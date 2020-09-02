import React from 'react'
import { toTop } from '../../helpers'

const Footer = ({ onAdd, onScan, onSearch, onTop }) => {
  return (
    <footer className="the-footer has-background-white-ter">

      {onScan ?
        <div className="footer-button" onClick={onScan}>
          <i className="fas fa-barcode fa-2x"></i>
          <div className="button-text">Scan</div>
        </div>
        : null}

      {onSearch ?
        <div className="footer-button" onClick={onSearch}>
          <i className="fas fa-search fa-2x"></i>
          <div className="button-text">Buscar</div>
        </div>
        : null}

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