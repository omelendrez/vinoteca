import React from 'react'

const NavBarGroup = ({ title, handleToggle, handleSubmenu, children, group, groups }) => {
  return (
    <div className='navbar-item has-dropdown is-hoverable'>
      <a className='navbar-link' onClick={() => handleSubmenu(group)}>{title}</a>
      <div className={`navbar-dropdown ${groups[group] ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
        {children}
      </div>
    </div>

  )
}

export default NavBarGroup
