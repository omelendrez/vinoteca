import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from '../common/TableFooter'
import Confirm from "../common/Confirm"
import { getCategories, deleteCategory } from "../../services/categories"

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
        title="Categorias"
        subTitle="Admnistración de categorias"
        width="is-6"
        background="is-primary"
      >

        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-category')}>
          Agregar
        </button>

        {alert.message && (
          <Notification
            message={alert.message}
            clear={clearAlert}
            type={alert.type}
          />
        )}

        <div className="container list-container">
          {rows && rows.map((category, index) => {
            const { code, name, statusName, created, createdByName, updated, updatedByName } = category
            return (
              <TableItem
                key={index}
                item={category}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField label="Código" value={code} />
                <TableFooter
                  statusName={statusName}
                  created={created}
                  createdByName={createdByName}
                  updated={updated}
                  updatedByName={updatedByName}
                />
              </TableItem>
            )
          })
          }
        </div>
        <Confirm
          title="Eliminando categoria"
          message={
            <span>
              Confirma eliminación de categoria <strong>{category.name}</strong>
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
