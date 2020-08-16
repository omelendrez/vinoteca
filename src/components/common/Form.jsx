import React, { useState, useEffect } from 'react'
import FormField from './FormField'
import FormTextArea from './FormTextArea'
import FormFieldSelect from './FormFieldSelect'
import FormFieldBarcode from './FormFieldBarcode'
import Notification from '../common/Notification'
import Validator from '../../validator'

const Form = ({ formHeader, fields, currentForm, handleSave, handleCancel, error }) => {
  const [form, setForm] = useState(currentForm || {})
  const [formAlert, setFormAlert] = useState({})
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const form = {}
    fields.map(field => form[field.fieldId] = currentForm[field.fieldId] || '')
    if (currentForm.id) {
      form['id'] = currentForm.id
    }
    setForm(currentForm)
  }, [currentForm, fields])

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

  const validate = () => {
    const [errors, isOk] = Validator(form, fields)
    setFormErrors(errors)
    return isOk
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (validate()) {
      const newForm = {}
      fields.map(field => {
        if (form[field.fieldId]) {
          newForm[field.fieldId] = form[field.fieldId]
        } else {
          newForm[field.fieldId] = field.type === 'number' ? 0 : ''
        }
      })
      if (currentForm.id) {
        newForm['id'] = form.id
      }
      handleSave(newForm)
      setFormAlert({})
    }
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
                  readOnly={field.readOnly}
                  options={field.options}
                  current={form[field.fieldId]}
                  selectItem={selectItem}
                  hasSearch={field.hasSearch}
                  icon={field.icon}
                  error={formErrors[field.fieldId]}
                />
              case 'textArea':
                return <FormTextArea
                  key={index}
                  label={field.label}
                  fieldId={field.fieldId}
                  fieldValue={form[field.fieldId]}
                  readOnly={field.readOnly}
                  handleChange={handleChange}
                  icon={field.icon}
                  error={formErrors[field.fieldId]}
                />
              case 'barcode':
                return <FormFieldBarcode
                  key={index}
                  label={field.label}
                  fieldId={field.fieldId}
                  fieldValue={form[field.fieldId]}
                  readOnly={true}
                  handleChange={handleChange}
                  icon={field.icon}
                  error={formErrors[field.fieldId]}
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
                  error={formErrors[field.fieldId]}
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