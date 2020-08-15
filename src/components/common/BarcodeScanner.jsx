import React, { useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
const codeReader = new BrowserMultiFormatReader();

const BarcodeScanner = () => {
  const [deviceId, setDeviceId] = useState('')
  const [barcode, setBarcode] = useState('')
  const [devices, setDevices] = useState([])
  const [isScanning, setIsScanning] = useState(false)

  const changeDevice = (e => {
    setDeviceId(e.target.value)
  })

  useEffect(() => {
    codeReader.getVideoInputDevices()
      .then(devices => {
        setDeviceId(devices[0].deviceId)
        setDevices(devices)
      })
  }, [])

  const scan = e => {
    e.preventDefault()
    setIsScanning(true)
    codeReader
      .decodeOnceFromVideoDevice(deviceId, 'video')
      .then(result => {
        setBarcode(result.text)
        codeReader.reset()
        setIsScanning(false)
        window.navigator.vibrate(200)
      })
      .catch(err => console.log(err));
  }

  const stop = e => {
    e.preventDefault()
    codeReader.reset()
    setIsScanning(false)
  }

  return (
    <div className="container">
      <select className="select input" onChange={e => changeDevice(e)} disabled={isScanning}>
        {devices.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
      </select>
      <div className="my-2">
        <button className={`button is-primary input ${isScanning ? 'is-loading' : ''}`} onClick={e => scan(e)}>
          Comenzar
        </button>
      </div>
      <div className="my-2">
        <video
          className="video"
          id="video"
          width="600"
          height="400"
        ></video>
      </div>
      <div className="my-2">
        <pre><code>{barcode}</code></pre>
      </div>
      {isScanning &&
        <div className="my-2">
          <button className="button is-danger input" onClick={e => stop(e)}>
            Cancelar
        </button>
        </div>
      }

    </div>
  )
}

export default BarcodeScanner