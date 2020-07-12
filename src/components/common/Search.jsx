import React, { useState, useEffect } from 'react'

const Search = ({ items, selectItem }) => {
  const LIST_SIZE = 5
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleClick = item => {
    setSearch(item.name)
    selectItem(item)
  }

  useEffect(() => {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()) || !search)
    setFilteredItems(filteredItems.slice(0, LIST_SIZE))
  }, [search, items])

  return (
    <nav className="panel">
      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">

          <input
            className="input"
            type="text"
            placeholder="Buscar"
            onChange={e => handleChange(e)}
            value={search}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>

        </p>
      </div>
      {
        filteredItems.map(item => (

          <a
            href="# "
            key={item.id}
            className="panel-block"
            onClick={() => handleClick(item)}
          >
            {item.name}
          </a>
        ))
      }
    </nav>
  )
}

export default Search