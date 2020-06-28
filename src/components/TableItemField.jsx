import React from 'react'

const TableItemField = ({ label, icon, value }) => {
  const iconElement = <i className={icon}></i>
  return (
    <div>{label || iconElement}{value}</div>
  )
}

export default TableItemField