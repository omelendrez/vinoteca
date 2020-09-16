import React from 'react'
import { formatAmount } from '../../helpers'

const Item = ({ isSelected, item, handleEdit, handleDelete, status }) => {
  const { productName, quantity, price } = item

  return (
    <tr className={isSelected}>
      <td>{productName}</td>
      <th>{quantity}</th>
      <th>{formatAmount(price)}</th>
      <td className="px-0">
        <button className="button is-white has-text-info" onClick={() => handleEdit(item)} ><i className="fa fa-edit"></i></button>
      </td>
      <td className="px-2">
        <button className="button is-white has-text-danger" onClick={() => handleDelete(item)} ><i className="fa fa-trash-alt"></i></button>
      </td>
    </tr>
  )
}

export default Item