import React from 'react'
import { formatDate } from '../../helpers'

const OrderHeader = ({ order, handleSend, handleCancel }) => {
  return (
    <div className="has-background-info-dark has-text-white columns mx-0 my-1">
      <div className="column is-size-5">{order.number}</div>
      <div className="column is-size-5">{order.supplierName}</div>
      <div className="column is-size-5">{formatDate(order.date)}</div>
      <div className="column is-size-5">{order.statusName}</div>
      {order.statusId === 1 &&
        <div className="column is-pulled-right">
          <button className="button is-info mx-2 my-1" onClick={e => handleSend(e)}>Enviar</button>
        </div>
      }
      <div className="column is-pulled-right">
        <button className="button is-danger mx-0 my-1" onClick={e => handleCancel(e)}>Cancelar</button>
      </div>
    </div>
  )
}

export default OrderHeader