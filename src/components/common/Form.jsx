import React, { useState, useEffect } from 'react'
import FormField from './FormField'
import FormTextArea from './FormTextArea'
import FormFieldSelect from './FormFieldSelect'
import Notification from '../common/Notification'

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
    let isOk = true
    let errors = {}
    fields.map(field => {
      const fieldValue = form[field.fieldId]

      if (field.isRequired) {
        if (!fieldValue) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} es un campo obligatorio`] }
        }
      }

      if (field.isEmail) {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(fieldValue)) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Dirección de ${field.label} no es válida`] }
        }
      }

      if (field.isPhone) {
        if (!/(?<=\s|:)\(?(?:(0?[1-3]\d{1,2})\)?(?:\s|-)?)?((?:\d[\d-]{5}|15[\s\d-]{7})\d+)/.test(fieldValue)) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Número de ${field.label} no es válido (291 456456)`] }
        }
      }

      if (field.isLimited) {
        const [min, max] = field.isLimited
        if (fieldValue.length < min) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} tiene que tener al menos ${min} caracteres`] }
        }
        if (fieldValue.length > max) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} no puede tener más de ${max} caracteres`] }
        }
      }

      if (field.onlyText) {
        if (!/^[a-zA-Z ]*$/.test(fieldValue)) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} no es válido, sólo se aceptan letras y espacios`] }
        }
      }

     if (field.isRange) {
        const [min, max] = field.isRange
        if (fieldValue < min) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} tiene que ser al menos ${min}`] }
        }
        if (max && fieldValue > max) {
          isOk = false
          errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} no puede ser más de ${max}`] }
        }
      }

    })
    setFormErrors(errors)
    return isOk
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (validate()) {
      const newForm = {}
      fields.map(field => newForm[field.fieldId] = form[field.fieldId] || '')
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