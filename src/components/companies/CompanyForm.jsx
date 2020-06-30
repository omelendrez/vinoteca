import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// import Notification from '../common/Notification'
// import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'

const CompanyForm = props => {

  const formDefault = {
    name: '',
    contact: '',
    address: '',
    phone: '',
    email: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  // const [alert, setAlert] = useState({})
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setForm(props.location.state.company)
  }, [])

  const handleChange = (e => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e) => {
    e.preventDefault()
    console.log(form)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/companies')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de empresas"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nueva empresa'}
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

        </Form>
      </Container>

    </>
  )
}

export default CompanyForm
