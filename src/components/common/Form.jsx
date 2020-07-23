import React, { useState, useEffect } from 'react'
import FormField from './FormField'
import FormTextArea from './FormTextArea'
import FormFieldSelect from './FormFieldSelect'
import Notification from '../common/Notification'

const Form = ({ formHeader, fields, currentForm, handleSave, handleCancel, error }) => {
  const [form, setForm] = useState({})
  const [formAlert, setFormAlert] = useState({})

  useEffect(() => {
    setForm(currentForm || {})
  }, [currentForm])

  useEffect(() => {
    setFormAlert(error)
  }, [error])


  const selectItem = (fieldId, item) => {
    if (item.id) {
      setFormAlert({})
      setForm({ ...form, [fieldId]: item.id })
    }
  }

  const handleChange = e => {
    setFormAlert({})
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSave(form)
    setFormAlert({})
  }

  return (
    <div className="card my-3">

      <header className="card-header has-background-link-dark">
        <p className="card-header-title has-text-white">{formHeader}</p>
      </header>

      <div className="card-content">
        <div className="content">
          {fields.map((field, index) => {
            if (field.hideEmpty && !form[field.fieldId]) return null
            switch (field.type) {
              case 'select':
                return <FormFieldSelect
                  key={index}
                  label={field.label}
                  fieldId={field.fieldId}
                  fieldValue={form[field.fieldId]}
                  options={field.options}
                  current={form[field.fieldId]}
                  selectItem={selectItem}
                  hasSearch={field.hasSearch}
                  icon={field.icon}
                />
              case 'textArea':
                return <FormTextArea
                  key={index}
                  label={field.label}
                  fieldId={field.fieldId}
                  fieldValue={form[field.fieldId]}
                  handleChange={handleChange}
                  icon={field.icon}
                />
              default:
                return <FormField
                  key={index}
                  label={field.label}
                  type={field.type}
                  fieldId={field.fieldId}
                  fieldValue={form[field.fieldId]}
                  readOnly={field.readOnly}
                  handleChange={handleChange}
                  icon={field.icon}
                />
            }
          })}
        </div>
        <Notification message={formAlert.message} type={formAlert.type} />
      </div>

      <footer className="card-footer">
        <a href="# " className="card-footer-item has-text-white has-background-info" onClick={handleSubmit}>Guardar</a>
        <a href="# " className="card-footer-item has-text-white has-background-danger" onClick={handleCancel}>Cancelar</a>
      </footer>

    </div>

  )
}

export default Form