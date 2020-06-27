import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = props => {
  return (
    <Link className="navbar-item" {...props}>
      {props.children}
    </Link>
  )
}

export default NavLink