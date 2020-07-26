import OrderDetail from './OrderDetail'

import React from 'react'

const OrderDetailsList = ({ items, handleEdit, handleDelete, status, handleAdd, back }) => {
  return (
    <>
      <table className="table is-fullwidth mx-0 my-1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Req</th>
            <th>Rec</th>
            <th>Precio</th>
            {status !== 3 && <th colSpan="2"></th>}
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
      <div>
        {status === 1 && <button className="button my-0" onClick={e => handleAdd(e)}>Agregar</button>}
        <button className="button my-0 is-pulled-right" onClick={() => back('/orders')}>Volver</button>
      </div>
    </>
  )
}

export default OrderDetailsList