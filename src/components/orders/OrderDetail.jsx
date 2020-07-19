import React from 'react'

const Item = ({ isSelected, item, handleEdit, handleDelete, status }) => {
  const { productName, storeName, qtyRequested } = item
  const disabled = status > 1 ? { disabled: true } : {}

  return (
    <tr className={isSelected}>
      <td>{productName}</td>
      <td>{storeName}</td>
      <th>{qtyRequested}</th>
      <td className="px-0">
        <button {...disabled} className="button is-white has-text-info" onClick={() => handleEdit(item)} ><i className="fa fa-edit"></i></button>
      </td>
      <td className="px-2">
        <button {...disabled} className="button is-white has-text-danger" onClick={() => handleDelete(item)} ><i className="fa fa-trash-alt"></i></button>
      </td>
    </tr>
  )
}

export default Item