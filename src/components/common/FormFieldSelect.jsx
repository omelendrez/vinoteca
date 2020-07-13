import React from 'react'

const FormFieldSelect = ({ label, icon, fieldId, fieldValue, children, handleChange, onClick }) => {
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
          onClick={onClick}
        >{children}
        </select>
      </div>
    </div>
  )
}
export default FormFieldSelect