import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from '../common/TableFooter'
import Confirm from "../common/Confirm"
import { getOrders, deleteOrder } from "../../services/orders"
import { formatDate, formatAmount } from '../../helpers'

const Orders = () => {
  const [orders, setOrders] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [order, setOrder] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getOrders()
      .then((orders) => {
        setOrders(orders)
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

  const handleEdit = (e, order) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-order', state: { order } })
  }

  const handleDelete = async (e, order) => {
    e.preventDefault()
    setOrder(order)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteOrder(order)
    setOrder({})
    setUpdate(!update)
  }

  const { rows } = orders
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
        title="Órdenes de compra"
        subTitle="Admnistración de órdenes de compra"
        width="is-6"
        background="is-primary"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-order')}>
          Agregar
        </button>
        <div className="container list-container">
          {rows && rows.map((order, index) => {
            const { number, date, amount, supplierName, statusName, created, createdByName, updated, updatedByName } = order
            return (
              <TableItem
                key={index}
                item={order}
                itemHeader={`${number} - ${supplierName}`}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField label="Número" value={number} />
                <TableItemField label="Fecha" value={formatDate(date)} />
                <TableItemField label="Importe" value={formatAmount(amount)} />
                <TableItemField label="Proveedor" value={supplierName} />
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
          title="Eliminando orden de compra"
          message={<span>Confirma eliminación de la orden de compra <strong>{`Nro. ${order.number} de ${order.supplierName} del ${formatDate(order.date)}`}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={order.id}
          close={() => setOrder({})}
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

export default Orders
