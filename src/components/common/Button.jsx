import React from 'react'

const Button = ({ label, color, handleClick }) => (
  <>
    <button className={`button mx-1 my-1 ${color}`} onClick={handleClick}>
      {label}
    </button>
  </>
)

export default Button