import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import Form from "../common/Form"
import { saveProduct, addProduct } from "../../services/products"
import { cleanData } from "../../helpers"
import { fields } from "./form.json"

const ProductForm = (props) => {
  const formDefault = {
    code: "",
    barcode: "",
    name: "",
    description: "",
    minimum: 0,
    price: 0,
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState("")
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.product) {
      setForm(props.location.state.product) //No funciona a pesar de que tengan el mismo formato
      console.log(props.location.state.product)
      console.log(form)
    }
  }, [])

  const clearAlert = () => {
    setAlert({})
  }

  const handleSave = (form) => {
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
          formHeader={form.id ? form.name : "Nuevo producto"}
          handleSave={form => handleSave(form)}
          handleCancel={handleCancel}
          currentForm={form}
          fields={fields}
          error={alert}
        >

        </Form>
      </Container>
    </>
  )
}

export default ProductForm
