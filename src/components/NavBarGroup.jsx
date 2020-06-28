import React, { useState } from 'react'

const NavBarGroup = ({ title, handleToggle, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmenu = () => setIsOpen(!isOpen)

  return (

    <div className='navbar-item has-dropdown is-hoverable'>
      <a className='navbar-link' onClick={handleSubmenu}>{title}</a>
      <div className={`navbar-dropdown ${isOpen ? '' : 'is-hidden-mobile is-hidden-tablet-only'}`} onClick={handleToggle}>
        {children}
      </div>
    </div>

  )
}

export default NavBarGroup
