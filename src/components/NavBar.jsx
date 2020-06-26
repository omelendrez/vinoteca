import React, { useState } from "react"
import "./NavBar.scss"

const NavBar = ({ user, setUser }) => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = e => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const logout = e => {
    e.preventDefault()
    setUser({})
  }

  return (
    <nav
      className='navbar is-light'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://bulma.io'>
          La Cava
        </a>

        <a
          role='button'
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label='menu'
          aria-expanded='false'
          onClick={handleToggle}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        {user.id && (
          <>
            <div className='navbar-start'>
              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link'>Productos</a>
                <div className='navbar-dropdown'>
                  <a className='navbar-item'>Categorías</a>
                  <a className='navbar-item'>Productos</a>
                </div>
              </div>

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link'>Inventario</a>
                <div className='navbar-dropdown'>
                  <a className='navbar-item'>Inventario</a>
                  <a className='navbar-item'>Faltantes</a>
                  <a className='navbar-item'>Correción de inventario</a>
                  <a className='navbar-item'>Motivos variación</a>
                </div>
              </div>

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link'>Órdenes de compra</a>
                <div className='navbar-dropdown'>
                  <a className='navbar-item'>Proveedores</a>
                  <a className='navbar-item'>Órdenes de compra</a>
                  <a className='navbar-item'>Depósitos</a>
                </div>
              </div>

              {user.profileId === 1 && (
                <div className='navbar-item has-dropdown is-hoverable'>
                  <a className='navbar-link'>Usuarios</a>
                  <div className='navbar-dropdown'>
                    <a className='navbar-item'>Empresas</a>
                    <a className='navbar-item'>Perfiles</a>
                    <a className='navbar-item'>Usuarios</a>
                  </div>
                </div>
              )}
            </div>

            <div className='navbar-end'>
              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link'>Usuario: {user.name}</a>
                <div className='navbar-dropdown'>
                  <a className='navbar-item'>Cambiar password</a>
                  <a className='navbar-item' onClick={logout}>
                    <span className='tag is-danger'>Logout</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
