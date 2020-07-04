import React from 'react'

const Notification = ({ message, clear, type }) => {
  if (!message) return null
  return (
    <div className={`notification ${type ? type : 'is-danger'} px-2 py-2 mb-1`}>
      <button className="delete" onClick={() => clear()}></button>
      {message}
    </div>
  )
}

export default Notification
