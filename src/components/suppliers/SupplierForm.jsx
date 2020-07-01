import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import { saveSupplier, addSupplier } from '../../services/suppliers'
import { cleanData } from '../../helpers'
import { getData } from '../../localStorage'

const SupplierForm = props => {

  const formDefault = {
    name: '',
    contact: '',
    address: '',
    phone: '',
    email: '',
    companyId: getData('user').companyId
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
          <FormField
            label="Nombre"
            type="text"
            fieldId="name"
            fieldValue={form.name}
            handleChange={handleChange}
          />
          <FormField
            label="Contacto"
            type="text"
            fieldId="contact"
            fieldValue={form.contact}
            handleChange={handleChange}
            icon="fas fa-user"
          />
          <FormField
            label="Dirección"
            type="text"
            fieldId="address"
            fieldValue={form.address}
            handleChange={handleChange}
            icon="fas fa-map-marker-alt"
          />
          <FormField
            label="Teléfono"
            type="text"
            fieldId="phone"
            fieldValue={form.phone}
            handleChange={handleChange}
            icon="fas fa-phone"
          />
          <FormField
            label="Email"
            type="text"
            fieldId="email"
            fieldValue={form.email}
            handleChange={handleChange}
            icon="fas fa-at"
          />
          {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}
        </Form>
      </Container>

    </>
  )
}

export default SupplierForm
