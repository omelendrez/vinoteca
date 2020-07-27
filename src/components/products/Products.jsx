import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import Confirm from "../common/Confirm"
import { getProducts, deleteProduct } from "../../services/products"
import { formatAmount, formatDate } from "../../helpers"
import { columns } from './list.json'

const Products = () => {
  const [products, setProducts] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [product, setProduct] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getProducts()
      .then((products) => {
        setProducts(products)
        setIsLoading(false)
        if (!products.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
        setIsLoading(false)
      })
  }, [])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, product) => {
    e.preventDefault()
    setRedirect({ pathname: "/edit-product", state: { product } })
  }

  const handleDelete = (e, product) => {
    e.preventDefault()
    setProduct(product)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteProduct(product)
      .then(() => {
        setProduct({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setProduct({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = products
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Productos"
        subTitle="Administración de productos"
        width="is-6"
        background="is-info"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect("/add-product")}>
          Agregar
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando producto"
          message={
            <span>
              Confirma eliminación de producto <strong>{product.name}</strong>?
            </span>
          }
          handleOk={confirmDelete}
          isActive={product.id}
          close={() => setProduct({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Products
