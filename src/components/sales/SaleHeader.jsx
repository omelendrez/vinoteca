import React from 'react'
import { formatAmount, formatDate } from '../../helpers'

const SaleHeader = ({ sale, handleSend }) => {
  return (
    <div className="has-background-info-dark has-text-white columns mx-0 my-1">
      <div className="column is-size-5">{sale.number}</div>
      <div className="column is-size-5">{formatDate(sale.date)}</div>
      <div className="column is-size-5">{formatAmount(sale.totalSale)}</div>
      <div className="column is-size-5">{sale.statusName}</div>
      {sale.statusId === 1 &&
        <div className="column">
          <button className="button" onClick={e => handleSend(e)}>Confirmar</button>
        </div>
      }
    </div>
  )
}

export default SaleHeader