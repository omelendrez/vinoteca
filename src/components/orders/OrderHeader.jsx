import React from 'react'
import { formatAmount, formatDate } from '../../helpers'

const OrderHeader = ({ order, handleSend, handleReceive, handleCancel }) => {
  return (
    <div className="has-background-info-dark has-text-white columns mx-0 my-1">
      <div className="column is-size-5">{order.number}</div>
      <div className="column is-size-5">{order.supplierName}</div>
      <div className="column is-size-5">{formatDate(order.date)}</div>
      <div className="column is-size-5">{formatAmount(order.totalOrder)}</div>
      <div className="column is-size-5">{order.statusName}</div>
      {order.statusId === 1 &&
        <div className="column">
          <button className="button" onClick={e => handleSend(e)}>Enviar</button>
        </div>
      }
      {order.statusId === 2 &&
        <div className="column">
          <button className="button" onClick={e => handleReceive(e)}>Recibir</button>
        </div>
      }
      {order.statusId === 2 &&
        <div className="column">
          <button className="button is-danger" onClick={e => handleCancel(e)}>Cancelar</button>
        </div>}

    </div>
  )
}

export default OrderHeader