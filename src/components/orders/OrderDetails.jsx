import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import OrderHeader from './OrderHeader'
import OrderDetailsList from './OrderDetailsList'
import Modal from '../common/Modal'
import Form from '../common/Form'
import Confirm from '../common/Confirm'
import Notification from '../common/Notification'
import Message from '../common/Message'
import { addDetail, saveDetail, deleteDetail } from '../../services/order_details'
import { getOrder, sendOrder, cancelOrder } from '../../services/orders'
import { fields } from './detailForm.json'
import { cleanData } from '../../helpers'

const OrderDetails = (props) => {
  const SEND = 2
  const CANCEL = 4
  const detailsDefault = {
    orderId: props.match.params.id,
    productId: '',
    qtyRequested: ''
  }
  const [form, setForm] = useState(detailsDefault)
  const [order, setOrder] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [item, setItem] = useState({})
  const [listAlert, setListAlert] = useState({})
  const [formAlert, setFormAlert] = useState({})
  const [confirmAction, setConfirmAction] = useState('')
  const [redirect, setRedirect] = useState('')
  const [message, setMessage] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getOrder(props.match.params.id)
      .then(order => setOrder(order))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))

  }, [props.match.params.id])

  const closeForm = () => {
    setShowForm(false)
  }

  const handleOk = item => {
    item.orderId = order.id
    if (form.id) {
      save(item)
    } else {
      add(item)
    }
  }

  const add = form => {
    const found = order.orderDetails.find(item => item.productId === parseInt(form.productId) && item.storeId === parseInt(form.storeId))
    if (found) {
      return setFormAlert({ message: 'Este producto ya existe en la orden', type: 'is-danger' })
    }
    addDetail(form)
      .then(detail => {
        order.orderDetails.push(detail.data)
        setOrder(order)
        setShowForm(false)
      })
      .catch(error => console.log(error))
  }

  const save = form => {
    saveDetail(cleanData(form))
      .then(detail => {
        setForm(detailsDefault)
        const newOrderDetails = order.orderDetails.map(item => {
          if (item.id === detail.id) {
            item = detail
          }
          return item
        })
        order.orderDetails = newOrderDetails
        setOrder(order)
        setShowForm(false)
      })
      .catch(error => setFormAlert({ message: error.message, type: 'is-danger' }))
  }

  const handleAdd = e => {
    e.preventDefault()
    setForm(detailsDefault)
    setShowForm(true)
  }

  const handleEdit = item => {
    setForm(item)
    setShowForm(true)
  }

  const handleDelete = item => {
    setItem(item)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteDetail(item)
      .then(() => {
        order.orderDetails = order.orderDetails.filter(detail => detail.id !== item.id)
        setOrder(order)
        setItem({})
        setIsLoading(false)
      })
      .catch(error => {
        setListAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }


  const handleSend = e => {
    e.preventDefault()
    setConfirmAction(SEND)
  }

  const confirmSend = () => {
    setIsLoading(true)
    const newStatus = {
      id: order.id,
      statusId: SEND
    }
    sendOrder(newStatus)
      .then(order => {
        setOrder(order)
        setConfirmAction('')
        setIsLoading(false)
      })
      .catch(error => {
        setListAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const handleCancel = e => {
    e.preventDefault()
    setConfirmAction(CANCEL)
  }

  const confirmCancel = () => {
    setIsLoading(true)
    const newStatus = {
      id: order.id,
      statusId: CANCEL
    }
    cancelOrder(newStatus)
      .then(order => {
        setOrder(order)
        setConfirmAction('')
        setIsLoading(true)
      })
      .catch(error => {
        setListAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })

  }

  if (redirect) {
    return Redirect({ to: redirect })
  }

  const { orderDetails: items } = order

  return (
    <Container
      title="Orden de compra"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <OrderHeader
        order={order}
        handleSend={handleSend}
        handleCancel={handleCancel}
      />

      <Notification message={listAlert.message} type={listAlert.type} />

      <OrderDetailsList
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        status={order.statusId}
        back={setRedirect}
        handleAdd={handleAdd}
      />


      <Modal
        isActive={showForm}
      >
        <Form
          formHeader={form.id ? 'Editando detalle' : 'Agregando detalle'}
          handleSave={form => handleOk(form)}
          currentForm={form}
          handleCancel={closeForm}
          fields={fields}
          error={formAlert}
        />

      </Modal>

      <Confirm
        title="Eliminando item"
        message={
          <span>
            Confirma eliminación de este producto <strong>{item.productName}</strong>?
          </span>
        }
        isActive={item.id}
        handleOk={confirmDelete}
        close={() => setItem({})}
        isLoading={isLoading}
      />

      <Confirm
        title={confirmAction === SEND ? 'Enviar orden de compra' : 'Cancelar orden de compra'}
        message={
          <span>
            Confirma {confirmAction === SEND ? 'enviar orden de compra' : 'cancelar orden de compra'} <strong>{order.number}</strong>, para proveedor <strong>{order.supplierName}</strong>?
          </span>
        }
        isActive={confirmAction}
        okText={confirmAction === SEND ? 'Enviar' : 'Cancelar'}
        cancelText={confirmAction === SEND ? 'Cancelar' : 'Salir'}
        handleOk={confirmAction === SEND ? confirmSend : confirmCancel}
        close={() => setConfirmAction('')}
        isLoading={isLoading}
      />

      <Modal isActive={message.message} >
        <Message message={message} close={() => setMessage({})} />
      </Modal>

    </Container>

  )
}

export default OrderDetails