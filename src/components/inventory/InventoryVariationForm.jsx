import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from "../common/Container"
import Form from "../common/Form"
import { addInventoryVariation } from "../../services/inventory_variations"
import { fields } from './form.json'

const InventoryVariationForm = () => {
  const formDefault = {
    storeId: '',
    productId: '',
    quantity: 0,
    variationType: '',
    variationReasonId: '',
    comments: ''
  }
  const [form, setForm] = useState(formDefault)
  const [alert, setAlert] = useState({})
  const [redirect, setRedirect] = useState('')

  const handleSave = form => {
    if (!form.variationType || !form.variationReasonId || !form.storeId || !form.productId) {
      return setAlert({ message: 'Complete los campos faltantes', type: "is-danger" })
    }
    if (parseInt(form.quantity) < 1) {
      return setAlert({ message: 'Cantidad no puede ser menor que 1', type: "is-danger" })
    }
    addInventoryVariation(form)
      .then(() => {
        setAlert({ message: 'Variación guardada satisfactoriamente', type: "is-success" })
        setForm(formDefault)
        setRedirect('/inventory-variations')
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
      })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setForm(formDefault)
    setAlert({})
    setRedirect('/inventory-variations')
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Container
        title="Creando variación de inventario"
        subTitle="Administración de inventario"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader="Nueva variación"
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

export default InventoryVariationForm