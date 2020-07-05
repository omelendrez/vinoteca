import React from 'react'

const Notification = ({ message, clear, type, className }) => {
  if (!message) return null
  return (<div className={className}><span className={`tag is-medium ${type}`}>{message}</span></div>)
  /*
  return (
    <div className={`notification ${type ? type : 'is-light'}`}>
      <button className="delete" onClick={() => clear()}></button>
      {message}
    </div>
  )
  */
}

export default Notification
