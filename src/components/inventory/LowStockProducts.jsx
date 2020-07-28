import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import { getLowStockProducts } from "../../services/products"
import { columns } from './list.json'

const Products = () => {
  const [products, setProducts] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getLowStockProducts()
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

  const { rows } = products
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Inventario"
        subTitle="Listado de productos faltantes"
        width="is-6"
        background="is-info"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect("/add-order")}>
          Crear orden de compra
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Products
