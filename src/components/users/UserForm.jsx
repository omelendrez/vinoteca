import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import { saveUser, addUser } from '../../services/users'
import { cleanData } from '../../helpers'
import { fields } from './form.json'

const UserForm = props => {

  const formDefault = {
    companyId: '',
    name: '',
    email: '',
    password: '',
    profileId: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.user) setForm(props.location.state.user)
  }, [props])

  const handleSave = (form) => {
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

export default UserForm
