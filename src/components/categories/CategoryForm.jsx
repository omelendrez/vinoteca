import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import Form from "../common/Form"
import FormField from "../common/FormField"
import { saveCategory, addCategory } from "../../services/categories"
import { cleanData } from "../../helpers"

const CategoryForm = (props) => {
  const formDefault = {
    code: "",
    name: ""
  }

  const [form, setForm] = useState(formDefault)
  const [redirect, setRedirect] = useState("")
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.category)
      setForm(props.location.state.category)
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
      saveCategory(cleanedForm)
        .then(() => {
          setIsLoading(false)
          setRedirect("/categories")
        })
        .catch((error) => {
          setIsLoading(false)
          setAlert({ message: error.message, type: "is-danger" })
        })
    } else {
      addCategory(form)
        .then(() => {
          setIsLoading(false)
          setRedirect("/categories")
        })
        .catch((error) => {
          setIsLoading(false)
          setAlert({ message: error.message, type: "is-danger" })
        })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setRedirect("/categories")
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {isLoading && <Loading />}
      <Container
        title={form.id ? "Editando" : "Agregando"}
        subTitle="Administración de categorias"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : "Nueva categoria"}
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
            label="Nombre"
            type="text"
            fieldId="name"
            fieldValue={form.name}
            handleChange={handleChange}
            icon="fas fa-user"
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

export default CategoryForm
