import SaleDetail from './SaleDetail'

import React from 'react'

const SaleDetailsList = ({ items, handleEdit, handleDelete, status, handleAdd, back }) => {
  return (
    <>
      <table className="table is-fullwidth mx-0 my-1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant</th>
            <th>Precio</th>
            <th>Total</th>
            {status === 1 && <th colSpan="2"></th>}
          </tr>
        </thead>
        <tbody>
          {items && items.map((item, index) => (
            <SaleDetail
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
        <button className="button my-0 is-pulled-right" onClick={() => back('/sales')}>Volver</button>
      </div>
    </>
  )
}

export default SaleDetailsList