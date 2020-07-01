import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import Form from "../common/Form"
import FormField from "../common/FormField"
import { saveProduct, addProduct } from "../../services/products"
import { cleanData } from "../../helpers"

const ProductForm = (props) => {
  const formDefault = {
    code: "",
    barcode: "",
    name: "",
    description: "",
    quantity: "",
    minimum: "",
    lastPurchaseDate: "",
    lastPurchasePrice: "",
    lastSaleDate: "",
    lastSalePrice: "",
    price: ""
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState("")
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.product)
      setForm(props.location.state.product)
  }, [props])

  const clearAlert = () => {
    setAlert({})
  }

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
    if (form.id) {
      const cleanedForm = cleanData(form)
      saveProduct(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect("/products")
        })
        .catch((error) => {
          setIsLoading(false)
          setAlert({ message: error.message, type: "is-danger" })
        })
    } else {
      addProduct(form)
        .then(() => {
          setIsLoading(false)
          setRedirect("/products")
        })
        .catch((error) => {
          setIsLoading(false)
          setAlert({ message: error.message, type: "is-danger" })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect("/products")
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? "Editando" : "Agregando"}
        subTitle="Administración de productos"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.code : "Nuevo producto"}
          handleSave={handleSave}
          handleCancel={handleCancel}
        >
          <FormField
            label="Codigo"
            type="text"
            fieldId="code"
            fieldValue={form.code}
            handleChange={handleChange}
          />
          <FormField
            label="Barcode"
            type="text"
            fieldId="barcode"
            fieldValue={form.barcode}
            handleChange={handleChange}
          />
          <FormField
            label="Descripcion"
            type="text"
            fieldId="description"
            fieldValue={form.description}
            handleChange={handleChange}
          />
          <FormField
            label="Cantidad"
            type="number"
            fieldId="quantity"
            fieldValue={form.quantity}
            handleChange={handleChange}
          />
          <FormField
            label="Minima"
            type="number"
            fieldId="minimum"
            fieldValue={form.minimum}
            handleChange={handleChange}
          />
          <FormField
            label="última fecha de compra"
            type="date"
            fieldId="lastPurchaseDate"
            fieldValue={form.lastPurchaseDate}
            handleChange={handleChange}
          />
          <FormField
            label="Ultimo precio de compra"
            type="number"
            fieldId="lastPurchasePrice"
            fieldValue={form.lastPurchasePrice}
            handleChange={handleChange}
          />
          <FormField
            label="Ultima fecha de venta"
            type="date"
            fieldId="lastSaleDate"
            fieldValue={form.lastSaleDate}
            handleChange={handleChange}
          />
          <FormField
            label="Precio de última venta"
            type="number"
            fieldId="lastSalePrice"
            fieldValue={form.lastSalePrice}
            handleChange={handleChange}
          />
          <FormField
            label="Precio"
            type="number"
            fieldId="price"
            fieldValue={form.price}
            handleChange={handleChange}
          />
          {alert.message && (
            <Notification
              message={alert.message}
              clear={clearAlert}
              type={alert.type}
            />
          )}
        </Form>
      </Container>
    </>
  )
}

export default ProductForm
