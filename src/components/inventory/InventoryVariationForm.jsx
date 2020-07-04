import React, { useState, useEffect } from 'react'
import Container from "../common/Container"
import Form from "../common/Form"
import FormField from "../common/FormField"
import FormFieldSelect from "../common/FormFieldSelect"
import Notification from "../common/Notification"
import { getStores } from "../../services/stores"
import { getProducts } from "../../services/products"
import { getVariationReasons } from "../../services/variation_reasons"
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
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [reasons, setReasons] = useState([])
  const [alert, setAlert] = useState({})

  useEffect(() => {
    getStores()
      .then(stores => setStores(stores.rows))
    getProducts()
      .then(products => setProducts(products.rows))
    getVariationReasons()
      .then(reasons => setReasons(reasons.rows))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addInventoryVariation(form)
      .then(() => {
        setIsLoading(false)
        setAlert({ message: 'Variación guardada satisfactoriamente', type: "is-success" })
        setForm(formDefault)
      })
      .catch((error) => {
        setIsLoading(false)
        setAlert({ message: error.message, type: "is-danger" })
      })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setForm(formDefault)
    setAlert({})
  }

  return (
    <>
      <Container
        title="Creando variación de inventario"
        subTitle="Administración de inventario"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader="Nueva variación"
          handleCancel={handleCancel}
          handleSave={handleSave}
          isLoading={isLoading}
        >
          <FormFieldSelect
            label="Depósito"
            fieldId="storeId"
            fieldValue={form.storeId}
            handleChange={handleChange}
          >
            <option value=""></option>
            {stores.map((store, index) => {
              return (
                <option key={index} value={store.id}>
                  {store.name}
                </option>
              )
            })}

          </FormFieldSelect>

          <FormFieldSelect
            label="Producto"
            fieldId="productId"
            fieldValue={form.productId}
            handleChange={handleChange}
          >
            <option value=""></option>
            {products.map((product, index) => {
              return (
                <option key={index} value={product.id}>
                  {product.name}
                </option>
              )
            })}
          </FormFieldSelect>

          <FormFieldSelect
            label="Razón"
            fieldId="variationReasonId"
            fieldValue={form.variationReasonId}
            handleChange={handleChange}
          >
            <option value=""></option>
            {reasons.map((reason, index) => {
              return (
                <option key={index} value={reason.id}>
                  {reason.name}
                </option>
              )
            })}
          </FormFieldSelect>

          <FormFieldSelect
            label="Tipo de variación"
            fieldId="variationType"
            fieldValue={form.variationType}
            handleChange={handleChange}
          >
            <option value=""></option>
            <option value="1">Incrementa stock</option>
            <option value="-1">Disminuye stock</option>
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
    </>
  )
}

export default InventoryVariationForm