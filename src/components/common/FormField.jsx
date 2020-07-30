import React from 'react'

const FormField = ({ label, type, fieldId, fieldValue, handleChange, required, icon, readOnly, autoComplete }) => {
  const iconElement = <span className="icon is-small is-left"><i className={icon}></i></span>

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
        <input
          className="input"
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
    </div>

  )
}

export default FormField