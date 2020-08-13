import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from "../common/List"
import Confirm from "../common/Confirm"
import { getCategories, deleteCategory } from "../../services/categories"
import { columns } from './list.json'

const Categories = () => {
  const [categories, setCategories] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [category, setCategory] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getCategories()
      .then((categories) => {
        setCategories(categories)
        setIsLoading(false)
        if (!categories.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
        setIsLoading(false)
      })
  }, [update])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, category) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-category', state: { category } })
  }

  const handleDelete = (e, category) => {
    e.preventDefault()
    setCategory(category)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteCategory(category)
      .then(() => {
        setCategory({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setCategory({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = categories
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Categorías"
        subTitle="Administración de categorías"
        width="is-6"
        background="is-primary"
      >

        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-category')}>
          Agregar
        </button>

        <a href="#" className="button is-floating is-primary">
          <i className="fas fa-chevron-up"></i>
        </a>

        {alert.message && (
          <Notification className="mx-1 my-1"
            message={alert.message}
            clear={clearAlert}
            type={alert.type}
          />
        )}

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando categoría"
          message={
            <span>
              ¿Confirma la eliminación de categoría <strong>{category.name}</strong>
              ?
            </span>
          }
          handleOk={confirmDelete}
          isActive={category.id}
          close={() => setCategory({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Categories
