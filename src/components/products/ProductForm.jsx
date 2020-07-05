import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import Form from "../common/Form"
import FormField from "../common/FormField"
import FormFieldSelect from "../common/FormFieldSelect"
import { saveProduct, addProduct } from "../../services/products"
import { getCategories } from "../../services/categories"
import { cleanData } from "../../helpers"
import { fields } from "./form.json"

const ProductForm = (props) => {
  const formDefault = {
    code: "",
    barcode: "",
    name: "",
    description: "",
    minimum: "",
    price: "",
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState("")
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.product)
      setForm(props.location.state.product)
    getCategories().then((categories) => setCategories(categories.rows))
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
          formHeader={form.id ? form.name : "Nuevo producto"}
          handleSave={handleSave}
          handleCancel={handleCancel}
        >
          <FormFieldSelect
            label="Categoria"
            fieldId="categoryId"
            fieldValue={form.categoryId}
            handleChange={handleChange}
          >
            <option value=""></option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              )
            })}
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
          })}
          <Notification
            message={alert.message}
            clear={clearAlert}
            type={alert.type}
          />
        </Form>
      </Container>
    </>
  )
}

export default ProductForm
