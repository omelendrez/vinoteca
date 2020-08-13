import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Form from '../common/Form'
import { changePassword } from '../../services/users'
import { cleanData } from '../../helpers'
import { getData } from '../../localStorage'
import { fields } from './changePasswordForm.json'

const ChangePassword = () => {

  const formDefault = {
    id: getData('user').id,
    name: getData('user').name,
    email: getData('user').email,
    oldPassword: '',
    password: '',
    confirmPassword: ''
  }

  const [form] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})

  const validatePasswords = (form) => {
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

  const handleSave = (form) => {
    if (validatePasswords(form)) {

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
          formHeader={form.id ? form.name : 'Nueva Password'}
          handleSave={form => handleSave(form)}
          handleCancel={handleCancel}
          fields={fields}
          currentForm={form}
          error={alert}
        />
      </Container>

    </>
  )
}

export default ChangePassword
