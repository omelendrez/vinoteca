import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import Confirm from "../common/Confirm"
import { getCategories, deleteCategory } from "../../services/categories"
import { formatDateFull } from "../../helpers"

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

  const handleDelete = async (e, category) => {
    e.preventDefault()
    setIsLoading(true)
    deleteCategory(category)
    setUpdate(!update)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteCategory(category)
    setCategory({})
    setUpdate(!update)
  }

  const { rows } = categories
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && (
        <Notification
          message={alert.message}
          clear={clearAlert}
          type={alert.type}
        />
      )}

      <Container
        title="Categorias"
        subTitle="Admnistración de categorias"
        width="is-6"
        background="is-primary"
      >
        <button className="button" onClick={() => setRedirect('/add-category')}>
          Agregar
        </button>
        {rows &&
          rows.map((category, index) => {
            const { code, name, created } = category
            return (
              <TableItem
                key={index}
                item={category}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField label="Código" value={code} />
                <br />
                <TableItemField
                  icon="fa fa-calendar-alt mr-2"
                  value={formatDateFull(created)}
                />
              </TableItem>
            )
          })}
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
      </Container>

      {!rows.length && (
        <Notification
          message="La tabla no contiene registros"
          type="is-light"
          clear={clearAlert}
        />
      )}

      {isLoading && <Loading />}
    </>
  )
}

export default Categories
