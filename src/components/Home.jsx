import React, { useState } from 'react'
import Scanner from './common/BarcodeScanner'
import './Home.scss'

const Home = () => {
  const [showScanner, setShowScanner] = useState(false)

  const handleScan = e => {
    e.preventDefault()
    setShowScanner(true)
  }

  const handleCodeRead = code => {
    if (code) {
      console.log(code)
    }
    setShowScanner(false)
  }

  return (
    <>
      <div className="image" />
      <button className="button btn-scan" onClick={e => handleScan(e)}>
        <i className="fa fa-barcode fa-3x"></i>
      </button>
      <Scanner
        show={showScanner}
        codeRead={handleCodeRead}
      />
    </>
  )
}

export default Home