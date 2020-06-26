import React, { useState } from "react"
import './NavBar.scss'

const NavBar = ({ user }) => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = e => {
    setIsActive(!isActive)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={handleToggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        {user.id && <div className="navbar-start">

          <a className="navbar-item">Productos</a>
          <a className="navbar-item">Depósitos</a>
          <a className="navbar-item">Categorías</a>
          <a className="navbar-item">Inventario</a>

        </div>}

      </div>
    </nav>
  )
}

export default NavBar
