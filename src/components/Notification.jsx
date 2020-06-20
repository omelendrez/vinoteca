import React from 'react'

const Notification = ({ message, clear }) => {
  return (
    <div className="notification is-danger px-2 py-2">
      <button className="delete" onClick={() => clear()}></button>
      {message}
    </div>
  )
}


export default Notification
