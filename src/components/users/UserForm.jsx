import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import FormFieldSelect from '../common/FormFieldSelect'
import { saveUser, addUser } from '../../services/users'
import { getProfiles } from '../../services/profiles'
import { getCompanies } from '../../services/companies'
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
  const [profiles, setProfiles] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.user) setForm(props.location.state.user)
    getProfiles()
      .then(profiles => {
        setProfiles(profiles.rows)
      })
    getCompanies()
      .then(companies => {
        setCompanies(companies.rows)
      })
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
          <FormFieldSelect
            label="Empresa"
            fieldId="companyId"
            fieldValue={form.companyId}
            handleChange={handleChange}
            icon="fas fa-building"
          >
            <option value=""></option>
            {companies.map((company, index) => {
              return (
                <option key={index} value={company.id}>{company.name}</option>
              )
            })
            }
          </FormFieldSelect>

          <FormFieldSelect
            label="Perfil"
            fieldId="profileId"
            fieldValue={form.profileId}
            handleChange={handleChange}
            icon="fas fa-users"
          >
            <option value=""></option>
            {profiles.map((profile, index) => {
              return (
                <option key={index} value={profile.id}>{profile.name}</option>
              )
            })
            }
          </FormFieldSelect>

          {fields.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              fieldId={field.fieldId}
              fieldValue={form[field.fieldId]}
              handleChange={handleChange}
              icon={field.icon}
            />
          ))}

          <Notification message={alert.message} clear={clearAlert} type={alert.type} />
        </Form>
      </Container>

    </>
  )
}

export default UserForm
