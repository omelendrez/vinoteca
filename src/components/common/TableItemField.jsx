import React from 'react'

const TableItemField = ({ label, icon, value }) => {
  const labelElement = <span className="has-text-weight-medium">{label}: </span>
  const iconElement = <i className={icon}></i>
  return (
    <div>{label ? labelElement : iconElement}{value}</div>
  )
}

export default TableItemField