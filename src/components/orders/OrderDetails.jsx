import React, { useState, useEffect } from 'react'
import Container from '../common/Container'
import OrderDetail from './OrderDetail'
import Modal from '../common/Modal'
import Form from '../common/Form'
import FormField from '../common/FormField'
import FormFieldSelect from '../common/FormFieldSelect'
import Confirm from '../common/Confirm'
import Notification from '../common/Notification'
import Search from '../common/Search'
import { addDetail, saveDetail, deleteDetail } from '../../services/order_details'
import { getOrder } from '../../services/orders'
import { getStores } from '../../services/stores'
import { getProducts } from '../../services/products'
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
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [item, setItem] = useState({})
  const [listAlert, setListAlert] = useState({})
  const [formAlert, setFormAlert] = useState({})
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [showStoreSearch, setShowStoreSearch] = useState(false)

  useEffect(() => {
    getOrder(props.match.params.id)
      .then(order => setOrder(order))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))

    getStores()
      .then(stores => setStores(stores.rows))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))

    getProducts()
      .then(products => setProducts(products.rows))
      .catch(error => setListAlert({ message: error.message, type: 'is-danger' }))

  }, [props.match.params.id])

  const handleChange = e => {
    setFormAlert({})
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const handleOk = () => {
    if (form.id) {
      save()
    } else {
      add()
    }
  }

  const add = () => {
    const found = order.orderDetails.find(item => item.productId === parseInt(form.productId) && item.storeId === parseInt(form.storeId))
    if (found) {
      return setFormAlert({ message: 'Producto ya existe en esta orden', type: 'is-warning' })
    }
    addDetail(form)
      .then(detail => {
        order.orderDetails.push(detail.data)
        setOrder(order)
        setShowForm(false)
      })
      .catch(error => setFormAlert({ message: error.message, type: 'is-danger' }))
  }

  const save = () => {
    saveDetail(cleanData(form))
      .then(detail => {
        setForm(detailsDefault)
        const newOrderDetails = order.orderDetails.map(item => {
          if (item.id === detail.data.id) {
            item = detail.data
          }
          return item
        })
        order.orderDetails = newOrderDetails
        setOrder(order)
        setShowForm(false)
      })
      .catch(error => setFormAlert({ message: error.message, type: 'is-danger' }))
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

  const handleShowProductSearch = e => {
    e.preventDefault()
    setShowProductSearch(true)
  }

  const selectProduct = product => {
    setFormAlert({})
    if (product.id)
      setForm({ ...form, productId: product.id })
    setShowProductSearch(false)
  }

  const handleShowStoreSearch = e => {
    e.preventDefault()
    setShowStoreSearch(true)
  }

  const selectStore = store => {
    setFormAlert({})
    if (store.id)
      setForm({ ...form, storeId: store.id })
    setShowStoreSearch(false)
  }

  const { orderDetails: items } = order

  return (
    <Container
      title="Orden de compra"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <button className="button mx-1 my-1" onClick={() => {
        setForm(detailsDefault)
        setShowForm(true)
      }}>
        Agregar
        </button>

      <Notification message={listAlert.message} type={listAlert.type} />

      <table className="table is-fullwidth mx-1 my-1">
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
          handleSave={handleOk}
          handleCancel={closeForm}
        >
          {/** inicio Producto */}
          {!showProductSearch &&
            <FormFieldSelect
              label="Product"
              fieldId="productId"
              fieldValue={form.productId}
              handleChange={handleChange}
              onClick={e => handleShowProductSearch(e)}
            >
              <option />
              {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}

            </FormFieldSelect>
          }

          <Modal isActive={showProductSearch}>
            <Search title="Productos" current={form.productId} icon="fas fa-wine-bottle" items={products} selectItem={item => selectProduct(item)} />
          </Modal>
          {/** fin Producto */}

          {fields.map(field => {
            if (field.hideEmpty && !form[field.fieldId]) return null
            return (
              <FormField
                key={field.fieldId}
                label={field.label}
                type={field.type}
                fieldId={field.fieldId}
                fieldValue={form[field.fieldId]}
                handleChange={handleChange}
              />
            )
          })}

          {/** inicio Depósito */}
          {!showStoreSearch &&
            <FormFieldSelect
              label="Depósito"
              fieldId="storeId"
              fieldValue={form.storeId}
              handleChange={handleChange}
              onClick={e => handleShowStoreSearch(e)}
            >
              <option />
              {stores.map(store => <option key={store.id} value={store.id}>{store.name}</option>)}

            </FormFieldSelect>
          }

          <Modal isActive={showStoreSearch}>
            <Search title="Depósitos" current={form.storeId} icon="fas fa-warehouse" items={stores} selectItem={item => selectStore(item)} />
          </Modal>
          {/** fin Depósito */}

          <Notification message={formAlert.message} type={formAlert.type} />

        </Form>

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