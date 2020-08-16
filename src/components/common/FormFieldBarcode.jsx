import React, { useState } from 'react'
import BarcodeScanner from './BarcodeScanner'

const FormField = ({ label, type, fieldId, fieldValue, handleChange, required, icon, readOnly, autoComplete, error }) => {
  const [showScanner, setShowScanner] = useState(false)

  const iconElement = <span className="icon is-small is-left"><i className={icon}></i></span>

  let message = ''
  let color = ''

  if (error) {
    color = error[0]
    message = error[1]
  }

  const handleClick = e => {
    e.preventDefault()
    setShowScanner(true)
  }

  const handleCodeRead = code => {
    setShowScanner(false)
    if (code) {
      handleChange({
        target: {
          id: fieldId,
          value: code
        }
      })
    }
  }

  return (
    <>
      <BarcodeScanner show={showScanner} codeRead={handleCodeRead} />

      <div className="field">
        <label className="label">{label}</label>
        <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
          <input
            className={`input ${color}`}
            type={type}
            id={fieldId}
            value={fieldValue}
            required={required}
            readOnly={readOnly}
            autoComplete={autoComplete}
            onClick={e => handleClick(e)}
          />
          {icon ? iconElement : ''}
        </div>
        <p className={`help ${color}`} >{message}&nbsp;</p>
      </div>
    </>
  )
}

export default FormField