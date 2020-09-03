import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Scanner from './common/BarcodeScanner'
import Modal from './common/Modal'
import Product from './products/Product'
import './Home.scss'

const Home = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [redirect, setRedirect] = useState({})

  const handleScan = e => {
    e.preventDefault()
    setShowScanner(true)
  }

  const handleCancel = e => {
    setBarcode('')
  }

  const handleCodeRead = code => {
    if (code) {
      setBarcode(code)
    }
    setShowScanner(false)
  }

  const confirmAdd = () => {
    const redirect = { pathname: '/add-product', state: { barcode: barcode } }
    setRedirect(redirect)
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="image" />

      <button className="button btn-scan" onClick={e => handleScan(e)}>
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
          close={handleCancel}
          confirmAdd={confirmAdd}
        />

      </Modal>

    </>
  )
}

export default Home