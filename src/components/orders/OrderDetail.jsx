import React from 'react'

const Item = ({ isSelected, item }) => {
  const { productName, storeName, qtyRequested } = item

  return (
    <tr className={isSelected}>
      <td>{productName}</td>
      <td>{storeName}</td>
      <th>{qtyRequested}</th>
      <td>
        <button className="button is-info is-small"><i className="fa fa-edit"></i></button>
      </td>
      <td>
        <button className="button is-danger is-small"><i className="fa fa-trash-alt"></i></button>
      </td>
    </tr>
  )
}

export default Item