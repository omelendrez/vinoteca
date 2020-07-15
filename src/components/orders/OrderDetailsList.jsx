import OrderDetail from './OrderDetail'

import React from 'react'

const OrderDetailsList = ({items, handleEdit, handleDelete}) => {
  return (
      <>
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
  </>
)}

export default OrderDetailsList