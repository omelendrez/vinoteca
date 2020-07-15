import React from 'react'

const OrderHeader = ({ order, handleAdd, handleSend, handleCancel }) => {
  return (
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
      <div className="is-pulled-left">
        <button className="button mx-0 my-1" onClick={e => handleAdd(e)}>Agregar</button>
      </div>

      <div className="is-pulled-right">
        <button className="button is-info mx-2 my-1" onClick={e => handleSend(e)}>Enviar</button>
        <button className="button is-danger mx-0 my-1" onClick={e => handleCancel(e)}>Cancelar</button>
      </div>
    </div>
  )
}

export default OrderHeader