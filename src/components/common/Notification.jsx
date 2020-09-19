import React from 'react'

const Notification = ({ message, clear, type, className }) => {
  if (!message) return null
  return (<div className={`notification is-medium ${className} ${type}`}>{message}</div>)
}

export default Notification
