import React from 'react'

const FormField = ({ label, type, fieldId, fieldValue, handleChange, required, icon, readOnly, autoComplete, error }) => {
  const iconElement = <span className="icon is-small is-left"><i className={icon}></i></span>
  let message = ''
  let color = ''

  if (error) {
    color = error[0]
    message = error[1]
  }
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
        <input
          className={`input ${color}`}
          type={type}
          id={fieldId}
          onChange={e => handleChange(e)}
          value={fieldValue}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
        />
        {icon ? iconElement : ''}
      </div>
      <p className={`help ${color}`} >{message}&nbsp;</p>
    </div>

  )
}

export default FormField