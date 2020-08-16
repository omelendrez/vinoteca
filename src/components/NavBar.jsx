import React, { useState } from "react"
import NavLink from './NavLink'
import NavBarGroup from './NavBarGroup'
import "./NavBar.scss"
import options from './NavBarMenu.json'

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

              {options.map(group =>
                <NavBarGroup title={group.group} handleToggle={handleToggle}>
                  {group.options.map(option => {
                    if (option.title === 'divider') {
                      return (<hr className="dropdown-divider" />)
                    } else {
                      return <NavLink to={option.url}>{option.title}</NavLink>
                    }
                  })}
                </NavBarGroup>
              )}

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
