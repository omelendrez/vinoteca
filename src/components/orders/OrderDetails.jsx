import React, { useState, useEffect } from 'react'
import Container from '../common/Container'
import OrderDetail from './OrderDetail'
import { getOrder } from '../../services/orders'

const OrderDetails = (props) => {
  const detailsDefault = {
    productId: '',
    storeId: '',
    qtyRequested: ''
  }
  const [form, setForm] = useState(detailsDefault)
  const [order, setOrder] = useState({})
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    getOrder(props.match.params.id)
      .then(order => setOrder(order))
  }, [update])

  const { orderDetails: items } = order

  return (
    <Container
      title="Orden de compra"
      subTitle="Items"
      width="is-8"
      background="is-warning">

      <button className="button mx-1 my-1" onClick={() => { }}>
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
            <OrderDetail key={index} item={item} />
          ))}

        </tbody>

      </table>

    </Container>
  )
}

export default OrderDetails