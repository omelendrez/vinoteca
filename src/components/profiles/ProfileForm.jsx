import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import { saveProfile, addProfile } from '../../services/profiles'
import { cleanData } from '../../helpers'
import { fields } from './form.json'

const ProfileForm = props => {

  const formDefault = {
    code: '',
    name: ''
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.profile)
      setForm(props.location.state.profile)
  }, [props])

  const handleSave = (form) => {
    setIsLoading(true)
    if (form.id) {
      const cleanedForm = cleanData(form)
      saveProfile(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/profiles')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addProfile(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/profiles')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/profiles')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}

      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de perfiles"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nuevo perfil'}
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

export default ProfileForm
