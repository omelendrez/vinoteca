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
        <span
          role='button'
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label='menu'
          aria-expanded='false'
          onClick={handleToggle}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </span>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        {user.id && (
          <>
            <div className='navbar-start'> {/* Opciones la izquierda en la navbar */}

              <NavLink to="/" onClick={handleToggle}>Home</NavLink>

              {/* <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('products')}>Productos</a>
                <div className={`navbar-dropdown ${groups.products ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Categorías</a>
                  <a className='navbar-item'>Productos</a>
                </div>
              </div> */}

              {user.profileId === 1 && (
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
              )}

              {/* <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('inventory')}>Inventario</a>
                <div className={`navbar-dropdown ${groups.inventory ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Inventario</a>
                  <a className='navbar-item'>Faltantes</a>
                  <a className='navbar-item'>Correción de inventario</a>
                  <a className='navbar-item'>Motivos variación</a>
                </div>
              </div> */}

              {user.profileId === 1 && (
                <NavBarGroup
                  title="Inventario"
                  group="inventory"
                  handleToggle={handleToggle}
                  handleSubmenu={handleSubmenu}
                  groups={groups}
                >
                  <NavLink to="/inventory">Inventario</NavLink>
                  <NavLink to="/low-stock">Faltantes</NavLink>
                  <NavLink to="/inventory-variations">Correción de inventario</NavLink>
                  <NavLink to="/variation-reasons">Motivos variación</NavLink>
                </NavBarGroup>
              )}

              {/* <div className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link' onClick={() => handleSubmenu('orders')}>Órdenes de compra</a>
                <div className={`navbar-dropdown ${groups.orders ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
                  <a className='navbar-item'>Proveedores</a>
                  <a className='navbar-item'>Órdenes de compra</a>
                  <a className='navbar-item'>Depósitos</a>
                </div>
              </div> */}

              {user.profileId === 1 && (
                <NavBarGroup
                  title="Órdenes de compra"
                  group="order"
                  handleToggle={handleToggle}
                  handleSubmenu={handleSubmenu}
                  groups={groups}
                >
                  <NavLink to="/suppliers">Proveedores</NavLink>
                  <NavLink to="/orders">Órdenes de compra</NavLink>
                  <NavLink to="/stores">Depósitos</NavLink>
                </NavBarGroup>
              )}

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
