import React from 'react'

const TableItemField = ({ label, icon, value, className }) => {
  const labelElement = label ? <span className="has-text-weight-medium">{label}: </span> : ''
  const iconElement = <i className={icon}></i>
  return (
    <div className={className}>{iconElement}{labelElement}{value}</div>
  )
}

export default TableItemField