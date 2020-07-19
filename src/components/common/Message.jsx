import React from 'react'

const Message = ({ message, close }) => {
  return (
    <article className={`message ${message.type}`}>
      <div className="message-body">
        {message.message}
        <button className="delete is-pulled-right" aria-label="delete" onClick={() => close()}></button>
      </div>
    </article>
  )
}

export default Message