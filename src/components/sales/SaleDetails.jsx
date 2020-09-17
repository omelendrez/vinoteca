import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import SaleHeader from './SaleHeader'
import SaleDetailsList from './SaleDetailsList'
import Modal from '../common/Modal'
import Form from '../common/Form'
import Confirm from '../common/Confirm'
import Notification from '../common/Notification'
import Message from '../common/Message'
import { addDetail, saveDetail, deleteDetail } from '../../services/sale_details'
import { getSale, confirmSale } from '../../services/sales'
import { fields } from './detailForm.json'
import { cleanData } from '../../helpers'

const SaleDetails = (props) => {
  const SEND = 2
  const detailsDefault = {
    saleId: props.match.params.id,
    productId: '',
    quantity: '',
    price: ''
  }
  const [form, setForm] = useState(detailsDefault)
  const [sale, setSale] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [item, setItem] = useState({})
  const [listAlert, setListAlert] = useState({})
  const [formAlert, setFormAlert] = useState({})
  const [confirmAction, setConfirmAction] = useState('')
  const [confirm, setConfirm] = useState({})
  const [redirect, setRedirect] = useState('')
  const [message, setMessage] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    switch (confirmAction) {
      case SEND:
        setConfirm({
          title: 'Enviar orden de compra',
          message: <span>Confirma enviar orden de compra <strong>{sale.number}</strong>, de proveedor <strong>{sale.supplierName}</strong>?</span>,
          okText: 'Enviar',
          action: confirmSend,
          cancelText: 'Cancelar',
          handleOk: confirmSend
        })
        break

      default:
        setConfirm({})
    }
  }, [confirmAction])

  useEffect(() => {
    getSale(props.match.params.id)
      .then(sale => setSale(sale))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))

  }, [props.match.params.id])

  const closeForm = () => {
    setShowForm(false)
  }

  const handleOk = item => {
    item.saleId = sale.id
    if (item.id) {
      save(item)
    } else {
      add(item)
    }
  }

  const add = form => {
    const found = sale.saleDetails.find(item => item.productId === parseInt(form.productId) && item.storeId === parseInt(form.storeId))
    if (found) {
      return setFormAlert({ message: 'Este producto ya existe en la orden', type: 'is-danger' })
    }
    addDetail(form)
      .then(detail => {
        sale.saleDetails.push(detail.data)
        const total = sale.totalSale + detail.data.total
        sale.totalSale = total
        setSale(sale)
        setForm(detailsDefault)
        setShowForm(false)
      })
      .catch(error => console.log(error))
  }

  const save = form => {
    saveDetail(cleanData(form))
      .then(detail => {
        let totalSale = 0
        const newSaleDetails = sale.saleDetails.map(item => {
          if (item.id === detail.id) {
            item = detail
          }
          totalSale += item.total
          return item
        })
        sale.saleDetails = newSaleDetails
        sale.totalSale = totalSale
        setSale(sale)
        setForm(detailsDefault)
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
        const total = sale.totalSale - item.total
        sale.saleDetails = sale.saleDetails.filter(detail => detail.id !== item.id)
        sale.totalSale = total
        setSale(sale)
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
      id: sale.id,
      statusId: SEND
    }
    confirmSale(newStatus)
      .then(sale => {
        setSale(sale)
        setConfirmAction('')
        setIsLoading(false)
      })
      .catch(error => {
        setListAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  if (redirect) {
    return Redirect({ to: redirect })
  }

  const { saleDetails: items } = sale

  return (
    <Container
      title="Venta"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <SaleHeader
        sale={sale}
        handleSend={handleSend}
      />

      <Notification message={listAlert.message} type={listAlert.type} />

      <SaleDetailsList
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        status={sale.statusId}
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
        title={confirm.title}
        message={<span>{confirm.message}</span>}
        isActive={confirmAction}
        okText={confirm.okText}
        cancelText={confirm.cancelText}
        handleOk={confirm.action}
        close={() => setConfirmAction('')}
        isLoading={isLoading}
      />

      <Modal isActive={message.message} >
        <Message message={message} close={() => setMessage({})} />
      </Modal>

    </Container>

  )
}

export default SaleDetails