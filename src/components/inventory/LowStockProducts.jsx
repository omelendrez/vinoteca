import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from "../common/TableFooter"
import { getLowStockProducts } from "../../services/products"

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

        <Notification message={alert.message} clear={clearAlert} type={alert.type} />

        <div className="container list-container">

          {rows && rows.map((product, index) => {
            const { categoryName, name, code, description, lastPurchaseDate, lastPurchasePrice, lastSaleDate, lastSalePrice, minimum, quantity, price, statusName, created, createdByName, updated, updatedByName } = product
            return (
              <TableItem
                key={index}
                item={product}
                itemHeader={name}
              >
                <Notification message={quantity <= minimum && quantity > 0 ? 'Producto con bajo stock' : ''} type="is-warning" clear={() => { }} />
                <Notification message={quantity === 0 ? 'Producto sin stock' : ''} type="is-danger" clear={() => { }} />
                <TableItemField label="Descripción" value={description} />
                <TableItemField label="Código" value={code} />
                <TableItemField label="Categoría" value={categoryName} />
                <TableItemField label="Stock" value={quantity} />
                <TableItemField label="Cantidad mínima" value={minimum} />
                <TableItemField label="Precio" value={`$ ${price.toFixed(2)}`} />
                <hr />
                <TableItemField label="Última compra" value={lastPurchaseDate} />
                <TableItemField label="Último precio de costo" value={`$ ${lastPurchasePrice.toFixed(2)}`} />
                <TableItemField label="Última venta" value={lastSaleDate} />
                <TableItemField label="Último precio de venta" value={`$ ${lastSalePrice.toFixed(2)}`} />
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

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Products
