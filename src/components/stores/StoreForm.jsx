import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import { saveStore, addStore } from '../../services/stores'
import { cleanData } from '../../helpers'

const StoreForm = props => {

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
    if (props.location && props.location.state && props.location.state.store) setForm(props.location.state.store)
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
      saveStore(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/stores')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addStore(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/stores')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/stores')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de depósitos"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nuevo depósito'}
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

export default StoreForm