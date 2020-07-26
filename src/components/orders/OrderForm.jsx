import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Form from '../common/Form'
import { fields } from './form.json'
import { addOrder } from '../../services/orders'

const OrderForm = () => {
  const orderDefault = {
    supplierId: '',
    date: '',
    storeId: ''
  }

  const [alert, setAlert] = useState({})
  const [redirect, setRedirect] = useState('')
  const [form, setForm] = useState(orderDefault)

  const handleSave = form => {
    if (!form.date || !form.supplierId) {
      return setAlert({ message: 'Complete todos los datos', type: 'is-warning' })
    }
    addOrder(form)
      .then(order => {
        setTimeout(() => {
          setRedirect('/orders')
        }, 3000)
        setAlert({ message: `Órden nro. ${order.data.number} creada`, type: 'is-success' })
      })
      .catch(error => setAlert({ message: error.message, type: 'is-danger' }))
  }

  const handleCancel = e => {
    e.preventDefault()
    setRedirect('/orders')
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Container
      title="Agregando"
      subTitle="Administrar órdenes de compra"
      width="is-6"
      background="is-warning"
    >
      <Form
        formHeader="Nueva órden de compra"
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

export default OrderForm