import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Scanner from './common/BarcodeScanner'
import Modal from './common/Modal'
import Product from './products/Product'
import Confirm from './common/Confirm'
import './Home.scss'

const Home = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [redirect, setRedirect] = useState('')

  const handleScan = e => {
    e.preventDefault()
    setShowScanner(true)
  }

  const handleCodeRead = code => {
    if (code) {
      setBarcode(code)
    }
    setShowScanner(false)
  }

  const confirmAdd = () => {
    setRedirect('/add-product')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="image" />

      <button className="button btn-scan" onClick={e => handleCodeRead(1234)}>
        <i className="fa fa-barcode fa-3x"></i>
      </button>

      <Scanner
        show={showScanner}
        codeRead={handleCodeRead}
      />

      <Modal
        isActive={barcode}
      >
        <Product
          barcode={barcode}
          close={() => setBarcode('')}
        />

      </Modal>

      <Confirm
        title="Producto inexistente"
        message={<span>Desea agregarlo al sistema?</span>}
        handleOk={confirmAdd}
        okText="Agregar"
        isActive={showConfirm}
        close={() => setShowConfirm(false)}
      />

    </>
  )
}

export default Home