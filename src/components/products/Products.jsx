import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from "../common/TableFooter"
import Confirm from "../common/Confirm"
import { getProducts, deleteProduct } from "../../services/products"
import { formatAmount } from "../../helpers"

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

        <div className="container list-container">

          {rows && rows.map((product, index) => {
            const { categoryName, name, code, description, lastPurchaseOrder, lastPurchaseDate, lastPurchasePrice, lastSaleDate, lastSalePrice, minimum, quantity, price, statusName, created, createdByName, updated, updatedByName } = product
            return (
              <TableItem
                key={index}
                item={product}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <Notification message={quantity <= minimum && quantity > 0 ? 'Producto con bajo stock' : ''} type="is-warning" clear={() => { }} />
                <Notification message={quantity === 0 ? 'Producto sin stock' : ''} type="is-danger" clear={() => { }} />

                <TableItemField label="Descripción" value={description} />
                <TableItemField label="Código" value={code} />
                <TableItemField label="Categoría" value={categoryName} />
                <TableItemField label="Stock" value={quantity} />
                <TableItemField label="Cantidad mínima" value={minimum} />
                <TableItemField label="Precio" value={formatAmount(price)} />
                <hr className="dropdown-divider" />
                <TableItemField label="Última orden de compra" value={lastPurchaseOrder} />
                <TableItemField label="Fecha" value={lastPurchaseDate} />
                <TableItemField label="Precio de compra" value={`$ ${lastPurchasePrice.toFixed(2)}`} />
                <hr className="dropdown-divider" />
                <TableItemField label="Última venta" value={lastSaleDate} />
                <TableItemField label="Precio de venta" value={`$ ${lastSalePrice.toFixed(2)}`} />
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
