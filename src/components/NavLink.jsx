import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = props => {
  const { pathname: page } = useLocation()
  const isActive = props.to.split('/')[1] === (page.split('/')[1])
  console.log(props.to.split('/')[1], (page.split('/')[1]))
  return (
    <Link className={`navbar-item ${isActive ? 'active' : ''}`} {...props}>
      {props.children}
    </Link>
  )
}

export default NavLink