import React, { useState, useEffect } from 'react'
import Container from '../common/Container'
import OrderDetail from './OrderDetail'
import Modal from '../common/Modal'
import Form from '../common/Form'
import Confirm from '../common/Confirm'
import Notification from '../common/Notification'
import { addDetail, saveDetail, deleteDetail } from '../../services/order_details'
import { getOrder, sendOrder, cancelOrder } from '../../services/orders'
import { fields } from './detailForm.json'
import { cleanData } from '../../helpers'

const OrderDetails = (props) => {
  const detailsDefault = {
    orderId: props.match.params.id,
    productId: '',
    storeId: '',
    qtyRequested: ''
  }
  const [form, setForm] = useState(detailsDefault)
  const [order, setOrder] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [item, setItem] = useState({})
  const [listAlert, setListAlert] = useState({})

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
      return console.log('ya existe')
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
    console.log(form)
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
    //.catch(error => setFormAlert({ message: error.message, type: 'is-danger' }))
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
    deleteDetail(item)
      .then(() => {
        order.orderDetails = order.orderDetails.filter(detail => detail.id !== item.id)
        setOrder(order)
        setItem({})
      })
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))
  }


  const handleSend = e => {
    e.preventDefault()
    const newStatus = {
      id: order.id,
      statusId: 2
    }
    sendOrder(newStatus)
      .then(order => setOrder(order))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))
  }

  const handleCancel = e => {
    e.preventDefault()
    const newStatus = {
      id: order.id,
      statusId: 4
    }
    cancelOrder(newStatus)
      .then(order => {
        setOrder(order)
      })
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))
  }

  const { orderDetails: items } = order

  return (
    <Container
      title="Orden de compra"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <div className="card ">
        <div className="container">
          <table className="table is-fullwidth has-background-info-dark has-text-white mb-1">
            <tbody>
              <tr>
                <td>{order.number}</td>
                <td>{order.supplierName}</td>
                <td>{order.statusName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="is-pulled-left">
        <button className="button mx-0 my-1" onClick={e => handleAdd(e)}>Agregar</button>
      </div>

      <div className="is-pulled-right">
        <button className="button is-info mx-2 my-1" onClick={e => handleSend(e)}>Enviar</button>
        <button className="button is-danger mx-0 my-1" onClick={e => handleCancel(e)}>Cancelar</button>
      </div>

      <Notification message={listAlert.message} type={listAlert.type} />

      <table className="table is-fullwidth mx-0 my-1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Depósito</th>
            <th><abbr title="Cantidad requerida">Cant.</abbr></th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item, index) => (
            <OrderDetail
              key={index}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}

        </tbody>

      </table>

      <Modal
        isActive={showForm}
      >
        <Form
          formHeader={form.id ? 'Editando detalle' : 'Agregando detalle'}
          handleSave={form => handleOk(form)}
          handleCancel={closeForm}
          fields={fields}
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
      />

    </Container>
  )
}

export default OrderDetails