import React, { useState } from "react"
import NavLink from './NavLink'
import NavBarGroup from './NavBarGroup'
import "./NavBar.scss"

const NavBar = ({ user, setUser }) => {
  const groupsDefaultStates = {
    products: false,
    inventory: false,
    orders: false,
    users: false,
    user: false
  }
  const [isActive, setIsActive] = useState(false)
  const [groups, setGroups] = useState(groupsDefaultStates)

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
        <NavLink to="/">La Cava</NavLink>
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

              <NavBarGroup
                title="Productos"
                group="products"
                handleToggle={handleToggle}
                handleSubmenu={handleSubmenu}
                groups={groups}
              >
                <NavLink to="/categories">Categorías</NavLink>
                <NavLink to="/products">Productos</NavLink>
              </NavBarGroup>

              <NavBarGroup
                title="Inventario"
                group="inventory"
                handleToggle={handleToggle}
                handleSubmenu={handleSubmenu}
                groups={groups}
              >
                <NavLink to="/inventory">Inventario</NavLink>
                <NavLink to="/low-stock">Faltantes</NavLink>
                <NavLink to="/inventory-variation">Correción de inventario</NavLink>
                <NavLink to="/variation-reasons">Motivos de variación</NavLink>
              </NavBarGroup>

              <NavBarGroup
                title="Órdenes de compra"
                group="orders"
                handleToggle={handleToggle}
                handleSubmenu={handleSubmenu}
                groups={groups}
              >
                <NavLink to="/providers">Proveedores</NavLink>
                <NavLink to="/orders">Órdenes de compra</NavLink>
                <NavLink to="/stores">Depósitos</NavLink>
              </NavBarGroup>

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

              <NavBarGroup
                title={user.name}
                group="user"
                handleToggle={handleToggle}
                handleSubmenu={handleSubmenu}
                groups={groups}
              >
                <a className='navbar-item'>
                  <i className="fa fa-key mr-2"></i> Password
                </a>
                <a className='navbar-item' onClick={logout}>
                  <i className="fa fa-sign-out-alt mr-2"></i> Logout
                </a>
              </NavBarGroup>

            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
