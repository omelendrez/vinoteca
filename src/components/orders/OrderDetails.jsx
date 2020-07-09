import React, { useState, useEffect } from 'react'
import Container from '../common/Container'
import OrderDetail from './OrderDetail'
import Modal from '../common/Modal'
import Form from '../common/Form'
import FormField from '../common/FormField'
import FormFieldSelect from '../common/FormFieldSelect'
import { getOrder } from '../../services/orders'
import { getStores } from '../../services/stores'
import { getProducts } from '../../services/products'
import { fields } from './detailForm.json'

const OrderDetails = (props) => {
  const detailsDefault = {
    productId: '',
    storeId: '',
    qtyRequested: ''
  }
  const [form, setForm] = useState(detailsDefault)
  const [order, setOrder] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getOrder(props.match.params.id)
      .then(order => setOrder(order))

    getStores()
      .then(stores => setStores(stores.rows))

    getProducts()
      .then(products => setProducts(products.rows))

  }, [props.match.params.id])

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const handleOk = () => {
    console.log(form)
  }

  const handleEdit = item => {
    console.log(item)
    setShowForm(true)
  }

  const handleDelete = item => {
    console.log(item)
  }

  const { orderDetails: items } = order

  return (
    <Container
      title="Orden de compra"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <button className="button mx-1 my-1" onClick={() => setShowForm(true)}>
        Agregar
        </button>

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

          <FormFieldSelect
            label="Depósito"
            fieldId="storeId"
            fieldValue={form.storeId}
            handleChange={handleChange}
          >
            <option />
            {stores.map(store => <option key={store.id} value={store.id}>{store.name}</option>)}

          </FormFieldSelect>

          <FormFieldSelect
            label="Product"
            fieldId="productId"
            fieldValue={form.productId}
            handleChange={handleChange}
          >
            <option />
            {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}

          </FormFieldSelect>

        </Form>

      </Modal>

    </Container>
  )
}

export default OrderDetails