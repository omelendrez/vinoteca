import React, { useState } from "react"
import NavLink from './NavLink'
import NavBarGroup from './NavBarGroup'
import "./NavBar.scss"

const NavBar = ({ user, setUser }) => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = e => {
    setIsActive(!isActive)
  }

  const logout = e => {
    e.preventDefault()
    setUser({})
  }

  return (
    <nav className='navbar is-dark' role='navigation' aria-label='main navigation'>

      <div className='navbar-brand'>

        <NavLink to="/">La Cava</NavLink>

        <a href="#/" role='button' className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label='menu' aria-expanded='false' onClick={handleToggle}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>

      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        {user.id && (
          <>
            <div className='navbar-start'> {/* Opciones la izquierda en la navbar */}

              <NavBarGroup title="Productos" handleToggle={handleToggle}>
                <NavLink to="/categories">Categorías</NavLink>
                <NavLink to="/products">Productos</NavLink>
              </NavBarGroup>

              <NavBarGroup title="Inventario" handleToggle={handleToggle}>
                <NavLink to="/low-stock-products">Faltantes</NavLink>
                <NavLink to="/inventory">Inventario</NavLink>
                <NavLink to="/inventory-variations">Correciones de inventario</NavLink>
                <hr className="dropdown-divider" />
                <NavLink to="/variation-reasons">Motivos de variación</NavLink>
              </NavBarGroup>

              <NavBarGroup title="Órdenes de compra" handleToggle={handleToggle}>
                <NavLink to="/orders">Órdenes de compra</NavLink>
                <hr className="dropdown-divider" />
                <NavLink to="/suppliers">Proveedores</NavLink>
                <NavLink to="/stores">Depósitos</NavLink>
              </NavBarGroup>

              {user.profileId === 1 && (
                <NavBarGroup title="Usuarios" handleToggle={handleToggle}>
                  <NavLink to="/users">Usuarios</NavLink>
                  <hr className="dropdown-divider" />
                  <NavLink to="/companies">Empresas</NavLink>
                  <NavLink to="/profiles">Perfiles</NavLink>
                </NavBarGroup>
              )}

            </div>

            <div className='navbar-end mr-6'> {/* Opciones de la derecha en la navbar */}

              <NavBarGroup title={user.name} handleToggle={handleToggle}>
                <NavLink to="/change-password"><i className="fa fa-key mr-2"></i> Password</NavLink>
                <hr className="dropdown-divider" />
                <a href="# " className='navbar-item' onClick={logout}><i className="fa fa-sign-out-alt mr-2"></i> Logout</a>
              </NavBarGroup>

            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
