import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import { changePassword } from '../../services/users'
import { cleanData } from '../../helpers'
import { getData } from '../../localStorage'

const ChangePassword = () => {

  const formDefault = {
    id: getData('user').id,
    name: getData('user').name,
    email: getData('user').email,
    oldPassword: '',
    password: '',
    confirmPassword: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})

  const clearAlert = () => {
    setAlert({})
  }

  const handleChange = (e => {
    e.preventDefault()
    setAlert({})
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const validatePasswords = () => {
    if (!form.oldPassword || !form.password || !form.confirmPassword) {
      setAlert({ message: 'Debe completar las tres passwords' })
      return false
    }
    if (form.oldPassword === form.password) {
      setAlert({ message: 'Password actual no puede ser igual a nueva password' })
      return false
    }

    if (form.password !== form.confirmPassword) {
      setAlert({ message: 'Nueva password no es igual a la password de confirmación' })
      return false
    }

    return true

  }

  const handleSave = (e) => {
    e.preventDefault()
    if (validatePasswords()) {

      const cleanedForm = cleanData(form)
      changePassword(cleanedForm)
        .then(() => setRedirect('/'))
        .catch(error => setAlert({ message: error.message, type: 'is-danger' }))
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Container
        title="Cambiar password"
        subTitle="Administración de usuarios"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.name}
          handleSave={handleSave}
          handleCancel={handleCancel}
        >
          <FormField
            label="Nombre"
            type="text"
            fieldId="name"
            fieldValue={form.name}
            handleChange={handleChange}
            icon="fas fa-user"
            readOnly={true}
          />
          <FormField
            label="Email"
            type="email"
            fieldId="email"
            fieldValue={form.email}
            handleChange={handleChange}
            icon="fas fa-at"
            readOnly={true}
          />
          <FormField
            label="Password actual"
            type="password"
            fieldId="oldPassword"
            fieldValue={form.oldPassword}
            handleChange={handleChange}
            icon="fas fa-key"
            autoComplete="new-password"
          />
          <FormField
            label="Nueva password"
            type="password"
            fieldId="password"
            fieldValue={form.password}
            handleChange={handleChange}
            icon="fas fa-key"
            autoComplete="new-password"
          />
          <FormField
            label="Confirmar nueva password"
            type="password"
            fieldId="confirmPassword"
            fieldValue={form.confirmPassword}
            handleChange={handleChange}
            icon="fas fa-key"
            autoComplete="new-password"
          />
          <Notification message={alert.message} clear={clearAlert} type={alert.type} />
        </Form>
      </Container>

    </>
  )
}

export default ChangePassword
