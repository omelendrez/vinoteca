import React, { useState, useEffect } from "react"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import { getProducts } from "../../services/products"
import { formatDateFull } from "../../helpers"

const Products = () => {
  const [products, setProducts] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getProducts()
      .then((products) => {
        setProducts(products)
        setIsLoading(false)
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
    console.log(product)
  }

  const handleDelete = (e, product) => {
    e.preventDefault()
    console.log(product)
  }

  const { rows } = products
  return (
    <>
      {alert.message && (
        <Notification
          message={alert.message}
          clear={clearAlert}
          type={alert.type}
        />
      )}

      <Container
        title="Productos"
        subTitle="Admnistración de productos"
        width="is-6"
        background="is-info"
      >
        {rows &&
          rows.map((product, index) => {
            const { name, price, created } = product
            return (
              <TableItem
                key={index}
                item={product}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField icon="fa fa-at mr-2" value={price} />
                <br />
                <TableItemField
                  icon="fa fa-calendar-alt mr-2"
                  value={formatDateFull(created)}
                />
              </TableItem>
            )
          })}
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

export default Products
