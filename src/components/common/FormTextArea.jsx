import React from 'react'

const FormTextArea = ({ label, fieldId, fieldValue, handleChange, required, icon, readOnly, autoComplete }) => {
  const iconElement = <span className="icon is-small is-left"><i className={icon}></i></span>
  console.log(fieldValue)
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
        <textarea
          className="textarea"
          id={fieldId}
          onChange={e => handleChange(e)}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          rows="2"
          value={fieldValue}
        />
        {icon ? iconElement : ''}
      </div>
    </div >

  )
}

export default FormTextArea