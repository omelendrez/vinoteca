import React from 'react'
import { formatAmount, formatDate } from '../../helpers'

const ListItemField = ({ column, value }) => {
  if (!column || !value) return null
  const labelElement = column.title ? <span className="has-text-weight-medium">{column.title}: </span> : ''
  const iconElement = <i className={column.icon}></i>
  const classElement = column.className || ''
  let valueElement = value
  if (column.isDate) {
    valueElement = valueElement ? formatDate(valueElement) : ''
  }
  if (column.isAmount) {
    valueElement = valueElement ? formatAmount(valueElement) : ''
  }
  return (
    <div className={classElement}>{iconElement}{labelElement}{valueElement}</div>
  )
}

export default ListItemField