import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import { saveUser, addUser } from '../../services/users'
import { cleanData } from '../../helpers'

const UserForm = props => {

  const formDefault = {
    name: '',
    email: '',
    password: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.user) setForm(props.location.state.user)
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
      saveUser(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/users')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addUser(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/users')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/users')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de usuarios"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nuevo usuario'}
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
          />
          <FormField
            label="Email"
            type="text"
            fieldId="email"
            fieldValue={form.email}
            handleChange={handleChange}
            icon="fas fa-at"
          />
          <FormField
            label="Password"
            type="text"
            fieldId="password"
            fieldValue={form.password}
            handleChange={handleChange}
            icon="fas fa-key"
          />
          {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}
        </Form>
      </Container>

    </>
  )
}

export default UserForm
