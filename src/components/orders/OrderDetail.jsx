import React from 'react'
import { formatAmount } from '../../helpers'

const Item = ({ isSelected, item, handleEdit, handleDelete, status }) => {
  const { productName, qtyRequested, qtyReceived, price } = item

  return (
    <tr className={isSelected}>
      <td>{productName}</td>
      <th>{qtyRequested}</th>
      {status === 2 || status === 3 && <th>{qtyReceived}</th>}
      {status === 2 || status === 3 && <th>{formatAmount(price)}</th>}
      {status !== 3 &&
        <td className="px-0">
          <button className="button is-white has-text-info" onClick={() => handleEdit(item)} ><i className="fa fa-edit"></i></button>
        </td>
      }
      {status === 1 &&
        <td className="px-2">
          <button className="button is-white has-text-danger" onClick={() => handleDelete(item)} ><i className="fa fa-trash-alt"></i></button>
        </td>
      }
    </tr>
  )
}

export default Item