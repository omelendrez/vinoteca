import React from 'react'
import { formatDate } from '../../helpers'

const OrderHeader = ({ order, handleSend, handleCancel }) => {
  return (
    <div className="card my-2">
      <table className="table is-fullwidth has-background-info-dark has-text-white">
        <tbody>
          <tr>
            <td className="is-size-5">{order.number}</td>
            <td className="is-size-5">{order.supplierName}</td>
            <td className="is-size-5">{formatDate(order.date)}</td>
            <td className="is-size-5">{order.statusName}</td>
            <td className="is-pulled-right">
              {order.statusId === 1 && <button className="button is-info mx-2 my-1" onClick={e => handleSend(e)}>Enviar</button>}
              <button className="button is-danger mx-0 my-1" onClick={e => handleCancel(e)}>Cancelar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderHeader