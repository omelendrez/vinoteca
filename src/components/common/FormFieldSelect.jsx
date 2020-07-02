import React from 'react'

const FormFieldSelect = ({ label, icon, fieldId, fieldValue, children, handleChange }) => {
  const iconElement = <span className="icon is-small is-left"><i className={icon}></i></span>

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
        {icon ? iconElement : ''}
        <select
          className="input"
          id={fieldId}
          onChange={e => handleChange(e)}
          value={fieldValue}
        >{children}
        </select>
      </div>
    </div>
  )
}
export default FormFieldSelect