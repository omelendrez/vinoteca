import React, { useState } from 'react'
import Modal from './Modal'

const Search = ({ show, handleText }) => {
  const [text, setText] = useState('')

  const handleChange = e => {
    setText(e.target.value)
  }

  const handleSend = e => {
    e.preventDefault()
    if (text) {
      handleText(text)
    }
  }

  const handleClose = e => {
    e.preventDefault()
    handleText('')
  }

  return (
    <Modal isActive={show}>
      <div className="card my-3 mx-1">
        <header className="card-header has-background-primary">
          <p className="card-header-title">
            Buscar producto
        </p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <div className="card-content">
          <input type="text" className="input" placeholder="Ingrese nombre a buscar" id="search" onChange={e => handleChange(e)}></input>
          <button className="button is-primary input" onClick={e => handleSend(e)}>
            Buscar
        </button>
        </div>
      </div>
    </Modal>

  )
}

export default Search