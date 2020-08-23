import React, { useState } from 'react'
import { columns } from './list.json'
import { formatAmount, formatDate } from '../../helpers'
import './product.scss'

const Table = (props) => {
  return (
    <table className="table">
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}

const RowTable = ({ item }) => {
  return (
    <tr>
      <td>{item.supplierName}</td>
      <th>{formatAmount(item.price)}</th>
      <td>{formatDate(item.created)}</td>
    </tr>

  )
}

const Product = ({ product, prices }) => {

  const [current, setCurrent] = useState(1)

  return (
    <div className="card my-3 mx-1">
      <header className="card-header has-background-primary">
        <button className="delete" aria-label="close"></button>
        <p className="card-header-title">
          {columns
            .filter(col => col.isHeader)
            .map((col, index) => <span key={index}>{product[col.columnId]}&nbsp;</span>)
          }
        </p>
      </header>
      <div className="tabs is-toggle is-fullwidth">
        <ul>
          <li className={current === 1 ? 'is-active' : ''} onClick={e => setCurrent(1)}>
            <a href="# ">
              <span>Info</span>
            </a>
          </li>
          <li className={current === 2 ? 'is-active' : ''} onClick={e => setCurrent(2)}>
            <a href="# ">
              <span>Precios</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="card-content product-card">
        <div className="content">

          {current === 1 && columns
            .filter(col => !col.isHeader)
            .map((col, index) => {
              let value = product[col.columnId]
              if (col.className === 'dropdown-divider') return <div key={index} className="dropdown-divider" />
              if (!value) return null
              if (col.isDate) value = formatDate(value)
              if (col.isAmount) value = formatAmount(value)
              return (<div key={index}>
                {col.title && <span key={index} className="has-text-weight-medium">{col.title}: </span>}
                {value}
              </div>)
            })}

          {current === 2 &&
            <Table>
              {prices.map((price, index) => <RowTable item={price} />)}
            </Table>
          }

        </div>
      </div>

    </div >
  )
}

export default Product