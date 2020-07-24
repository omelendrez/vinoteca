import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import { saveCompany, addCompany } from '../../services/companies'
import { cleanData } from '../../helpers'
import { fields } from './form.json'

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
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.company) setForm(props.location.state.company)
  }, [props])

  const handleSave = (form) => {
    setIsLoading(true)
    if (form.id) {
      const cleanedForm = cleanData(form)
      saveCompany(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/companies')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addCompany(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/companies')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/companies')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
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
          currentForm={form}
          fields={fields}
          error={alert}
        />
      </Container>

    </>
  )
}

export default CompanyForm
