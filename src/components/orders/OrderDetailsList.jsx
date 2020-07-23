import OrderDetail from './OrderDetail'

import React from 'react'

const OrderDetailsList = ({ items, handleEdit, handleDelete, status }) => {
  return (
    <>
      <table className="table is-fullwidth mx-0 my-1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Req</th>
            <th>Rec</th>
            <th>Precio</th>
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
              status={status}
            />
          ))}

        </tbody>

      </table>
    </>
  )
}

export default OrderDetailsList