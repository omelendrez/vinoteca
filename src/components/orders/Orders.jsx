import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import Footer from '../common/Footer'
import Confirm from "../common/Confirm"
import { getOrders, deleteOrder } from "../../services/orders"
import { formatDate } from '../../helpers'
import { columns } from './list.json'

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
        if (!orders.count) {
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

  const handleEdit = (e, order) => {
    e.preventDefault()
    setRedirect({ pathname: `/order-details/${order.id}`, state: { order } })
  }

  const handleDelete = async (e, order) => {
    e.preventDefault()
    clearAlert()
    setOrder(order)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    deleteOrder(order)
      .then(() => {
        setOrder({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setOrder({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = orders
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Órdenes de compra"
        subTitle="Admnistración de órdenes de compra"
        width="is-6"
        background="is-warning"
      >

        <Notification className="mx-1 my-1"
          message={alert.message}
          clear={clearAlert}
          type={alert.type}
        />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando orden de compra"
          message={<span>Confirma eliminación de la orden de compra <strong>{`Nro. ${order.number} de ${order.supplierName} del ${formatDate(order.date)}`}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={order.id}
          close={() => setOrder({})}
        />

        {isLoading && <Loading />}

      </Container>
      <Footer
        onAdd={() => setRedirect('/add-order')}
        onTop="true"
      />

    </>
  )
}

export default Orders
