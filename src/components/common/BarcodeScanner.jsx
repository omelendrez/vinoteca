import React, { useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/library'
const codeReader = new BrowserQRCodeReader();

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('')
  codeReader
    .decodeOnceFromVideoDevice(undefined, 'video')
    .then(result => setBarcode(result.text))
    .catch(err => console.error(err));
  return (
    <>
      <video
        className="video"
        id="video"
      ></video>
      <div>
        <input type="text" className="input" defaultValue={barcode} />
      </div>
    </>
  )
}

export default BarcodeScanner