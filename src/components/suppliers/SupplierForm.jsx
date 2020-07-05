import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import { saveSupplier, addSupplier } from '../../services/suppliers'
import { cleanData } from '../../helpers'
import { fields } from './form.json'

const SupplierForm = props => {

  const formDefault = {
    name: '',
    contact: '',
    address: '',
    phone: '',
    email: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.supplier) setForm(props.location.state.supplier)
  }, [props])

  const clearAlert = () => {
    setAlert({})
  }

  const handleChange = (e => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (form.id) {
      const cleanedForm = cleanData(form)
      saveSupplier(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/suppliers')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addSupplier(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/suppliers')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/suppliers')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de proveedores"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nuevo proveedor'}
          handleSave={handleSave}
          handleCancel={handleCancel}
        >
          {fields.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              fieldId={field.fieldId}
              fieldValue={form[field.fieldId]}
              handleChange={handleChange}
              icon={field.icon}
            />
          ))}
          <Notification message={alert.message} clear={clearAlert} type={alert.type} />
        </Form>
      </Container>

    </>
  )
}

export default SupplierForm
