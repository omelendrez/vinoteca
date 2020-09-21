import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Form from '../common/Form'
import { fields } from './form.json'
import { addSale } from '../../services/sales'

const SaleForm = () => {
  const saleDefault = {
    date: '',
    storeId: ''
  }

  const [alert, setAlert] = useState({})
  const [redirect, setRedirect] = useState('')
  const [form] = useState(saleDefault)

  const handleSave = form => {
    if (!form.date) {
      return setAlert({ message: 'Complete todos los datos', type: 'is-warning' })
    }
    addSale(form)
      .then(sale => {
        setTimeout(() => {
          setRedirect('/sales')
        }, 1000)
        setAlert({ message: `Venta nro. ${sale.data.number} creada`, type: 'is-success' })
      })
      .catch(error => setAlert({ message: error.message, type: 'is-danger' }))
  }

  const handleCancel = e => {
    e.preventDefault()
    setRedirect('/sales')
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Container
      title="Agregando"
      subTitle="Administrar ventas"
      width="is-6"
      background="is-warning"
    >
      <Form
        formHeader="Nueva venta"
        handleCancel={handleCancel}
        handleSave={form => handleSave(form)}
        fields={fields}
        error={alert}
        currentForm={form}
      >
      </Form>
    </Container>
  )
}

export default SaleForm