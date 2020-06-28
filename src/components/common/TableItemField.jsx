import React from 'react'

const TableItemField = ({ label, icon, value }) => {
  const labelElement = <span>{label}: </span>
  const iconElement = <i className={icon}></i>
  return (
    <div>{label ? labelElement : iconElement}{value}</div>
  )
}

export default TableItemField