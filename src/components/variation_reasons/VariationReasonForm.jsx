import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../common/Loading'
import Container from '../common/Container'
import Form from '../common/Form'
import { saveVariationReason, addVariationReason } from '../../services/variation_reasons'
import { cleanData } from '../../helpers'
import { getData } from '../../localStorage'
import { fields } from './form.json'

const VariationReasonForm = props => {

  const formDefault = {
    code: '',
    name: '',
    companyId: getData('user').companyId
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState('')
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.variationReason) setForm(props.location.state.variationReason)
  }, [props])

  const handleSave = (form) => {
    setIsLoading(true)
    if (form.id) {
      const cleanedForm = cleanData(form)
      saveVariationReason(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect('/variation-reasons')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    } else {
      addVariationReason(form)
        .then(() => {
          setIsLoading(false)
          setRedirect('/variation-reasons')
        })
        .catch(error => {
          setIsLoading(false)
          setAlert({ message: error.message, type: 'is-danger' })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect('/variation-reasons')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? 'Editando' : 'Agregando'}
        subTitle="Administración de razones de variación de inventario"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : 'Nueva razón de variación de inventario'}
          handleSave={form => handleSave(form)}
          currentForm={form}
          handleCancel={handleCancel}
          fields={fields}
          error={alert}
        />
      </Container>
    </>
  )
}

export default VariationReasonForm
