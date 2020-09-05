import React, { useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { getData, saveData } from '../../localStorage'
const codeReader = new BrowserMultiFormatReader();

const BarcodeScanner = ({ codeRead }) => {
  const defaultCamera = getData('camera')
  const [deviceId, setDeviceId] = useState('')
  const [devices, setDevices] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [barcode, setBarcode] = useState('')

  const changeDevice = (e => {
    setDeviceId(e.target.value)
    saveData('camera', e.target.value)
  })

  useEffect(() => {
    codeReader.getVideoInputDevices()
      .then(devices => {
        if (devices.length) {
          setDeviceId(devices[0].deviceId)
          saveData('camera', devices[0].deviceId)
        }
        setDevices(devices)
        setDeviceId(defaultCamera)
      })
  }, [])

  const scan = e => {
    e.preventDefault()
    setIsScanning(true)
    codeReader
      .decodeOnceFromVideoDevice(deviceId, 'video')
      .then(result => {
        codeReader.reset()
        setIsScanning(false)
        window.navigator.vibrate(200)
        codeRead(result.text)
      })
      .catch(err => console.log(err));
  }
  const read = e => {
    codeRead(e.target.value)
    setBarcode('')
  }

  const stop = e => {
    e.preventDefault()
    codeReader.reset()
    setIsScanning(false)
    codeRead(null)
  }

  return (
    <div className="container has-background-white-ter px-4 py-4">
      <input type="text" className="input my-2" autoFocus onChange={e => read(e)} value={barcode} />
      <select className="select input" onChange={e => changeDevice(e)} disabled={isScanning} value={deviceId}>
        {devices.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
      </select>
      <div className="my-2">
        <button className={`button is-primary input ${isScanning ? 'is-loading' : ''}`} onClick={e => scan(e)}>
          Comenzar
        </button>
      </div>
      <div className="my-2 has-background-grey-lighter">
        <video
          className="video"
          id="video"
          width="600"
          height="400"
        ></video>
      </div>
      <div className="my-2">
        <button className="button is-danger input" onClick={e => stop(e)}>
          Cancelar
        </button>
      </div>

    </div >
  )
}

export default BarcodeScanner