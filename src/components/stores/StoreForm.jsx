import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import { saveStore, addStore } from '../../services/stores'
import { cleanData } from '../../helpers'
import { fields } from './form.json'

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

  const handleSave = (form) => {
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
          handleSave={form => handleSave(form)}
          handleCancel={handleCancel}
          fields={fields}
          error={alert}
          currentForm={form}
        />
      </Container>
    </>
  )
}

export default StoreForm