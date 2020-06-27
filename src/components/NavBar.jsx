import React, { useState } from "react"
import NavLink from './NavLink'
import NavBarGroup from './NavBarGroup'
import "./NavBar.scss"

const NavBar = ({ user, setUser }) => {
  const expandedDefaults = {
    products: false,
    inventory: false,
    orders: false,
    users: false,
    user: false
  }
  const [isActive, setIsActive] = useState(false)
  const [groups, setGroups] = useState(expandedDefaults)

  const handleToggle = e => {
    setIsActive(!isActive)
  }

  const handleSubmenu = submenu => {
    const exp = { ...groups }
    exp[submenu] = !exp[submenu]
    setGroups(exp)
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
        <NavLink to="/">La Caba</NavLink>
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
            <div className='navbar-start'> {/* Opciones la izquierda en la navbar */}

              <NavLink to="/" onClick={handleToggle}>Home</NavLink>

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('products')}>Productos</a>
                <div className={`navbar-dropdown ${groups.products ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Categorías</a>
                  <a className='navbar-item'>Productos</a>
                </div>
              </div>

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('inventory')}>Inventario</a>
                <div className={`navbar-dropdown ${groups.inventory ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Inventario</a>
                  <a className='navbar-item'>Faltantes</a>
                  <a className='navbar-item'>Correción de inventario</a>
                  <a className='navbar-item'>Motivos variación</a>
                </div>
              </div>

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('orders')}>Órdenes de compra</a>
                <div className={`navbar-dropdown ${groups.orders ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Proveedores</a>
                  <a className='navbar-item'>Órdenes de compra</a>
                  <a className='navbar-item'>Depósitos</a>
                </div>
              </div>

              {user.profileId === 1 && (
                <NavBarGroup
                  title="Usuarios"
                  group="users"
                  handleToggle={handleToggle}
                  handleSubmenu={handleSubmenu}
                  groups={groups}
                >
                  <NavLink to="/companies">Empresas</NavLink>
                  <NavLink to="/profiles">Perfiles</NavLink>
                  <NavLink to="/users">Usuarios</NavLink>
                </NavBarGroup>
              )}

            </div>

            <div className='navbar-end mr-6'> {/* Opciones de la derecha en la navbar */}

              <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('user')}>{user.name}</a>
                <div className={`navbar-dropdown ${groups.user ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>
                    <i className="fa fa-key mr-2"></i> Password
                  </a>
                  <a className='navbar-item' onClick={logout}>
                    <i className="fa fa-sign-out-alt mr-2"></i> Logout
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
