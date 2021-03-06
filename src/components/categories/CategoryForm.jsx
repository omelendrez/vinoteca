import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Loading from "../common/Loading"
import Container from "../common/Container"
import Form from "../common/Form"
import { saveCategory, addCategory } from "../../services/categories"
import { cleanData } from "../../helpers"
import { fields } from './form.json'

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

  const handleSave = (form) => {
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
        subTitle="Administración de categorías"
        width="is-6"
        background="is-primary"
      >
        <Form
          formHeader={form.id ? form.name : "Nueva categoría"}
          handleSave={form => handleSave(form)}
          handleCancel={handleCancel}
          currentForm={form}
          fields={fields}
          error={alert}
        />
      </Container>
    </>
  )
}

export default CategoryForm
