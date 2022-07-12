import React, { useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { getData, saveData } from '../../localStorage'
const codeReader = new BrowserMultiFormatReader()

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
    codeReader.listVideoInputDevices()
      .then(devices => {
        if (devices.length && !defaultCamera) {
          setDeviceId(devices[0].deviceId || 0)
          saveData('camera', devices[0].deviceId || 0)
        }
        setDevices(devices)
        setDeviceId(defaultCamera)
      })
  }, [defaultCamera])

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
      .catch(err => console.log(err))
  }
  const read = e => {
    const key = e.which || e.keyCode
    if (key === 13) {
      codeRead(e.target.value)
      setBarcode('')
    }
  }

  const stop = e => {
    e.preventDefault()
    codeReader.reset()
    setIsScanning(false)
    codeRead(null)
  }

  return (
    <div className="container has-background-white-ter px-4 py-4">
      <input type="text" className="input my-2" autoFocus onKeyDown={e => read(e)} defaultValue={barcode} />
      <select className="select input" onChange={e => changeDevice(e)} disabled={isScanning} value={deviceId || 0}>
        {devices.map((device, index) => <option key={index} value={device.deviceId || 0}>{device.label}</option>)}
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
