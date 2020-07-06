import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Form from '../common/Form'
import FormField from '../common/FormField'
import FormFieldSelect from '../common/FormFieldSelect'
import Notification from '../common/Notification'
import { fields } from './form.json'
import { getSuppliers } from '../../services/suppliers'
import { addOrder } from '../../services/orders'

const OrderForm = () => {
  const formDefault = {
    date: '',
    supplierId: ''
  }
  const [form, setForm] = useState(formDefault)
  const [suppliers, setSuppliers] = useState([])
  const [alert, setAlert] = useState({})
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    getSuppliers()
      .then(suppliers => setSuppliers(suppliers.rows))
      .catch(error => setAlert({ message: error.message, type: 'is-danger' }))
  }, [])

  const handleChange = e => {
    e.preventDefault()
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSave = e => {
    e.preventDefault()
    if (!form.date || !form.supplierId) {
      return setAlert({ message: 'Complete todos los datos', type: 'is-warning' })
    }
    addOrder(form)
      .then(order => {
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
        formHeader={form.id ? form.supplierName : 'Nueva órden de compra'}
        handleSave={handleSave}
        handleCancel={handleCancel}
      >
        <FormFieldSelect
          label="Proveedores"
          fieldId="supplierId"
          fieldValue={form.supplierId}
          handleChange={handleChange}
        >
          <option></option>
          {suppliers.map((supplier, index) => <option key={index} value={supplier.id}>{supplier.name}</option>)}

        </FormFieldSelect>

        {fields.map((field, index) => {
          if (field.hideEmpty && !form[field.fieldId]) return null
          return (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              fieldId={field.fieldId}
              fieldValue={form[field.fieldId]}
              handleChange={handleChange}
              icon={field.icon}
              readOnly={field.readOnly}
            />
          )
        }
        )}
        <Notification message={alert.message} type={alert.type} />
      </Form>
    </Container>
  )
}

export default OrderForm