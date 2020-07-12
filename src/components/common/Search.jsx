import React, { useState, useEffect } from 'react'

const Search = ({ title, items, selectItem, icon }) => {
  const LIST_SIZE = 10
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [blankRows, setBlankRows] = useState([])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleClick = item => {
    setSearch(item.name)
    selectItem(item)
  }

  const onKeyDown = e => {
    var keycode = (e.keyCode ? e.keyCode : e.which)
    if (keycode === 13 && filteredItems.length === 1) {
      selectItem(filteredItems[0])
    }
    if (keycode === 27) {
      selectItem({})
    }
  }

  useEffect(() => {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || !search)
    setFilteredItems(filteredItems.slice(0, LIST_SIZE))
    if (filteredItems.length === 1) {
      setSearch(filteredItems[0].name)
    }
    const newBlankRows = []
    for (let i = filteredItems.length; i < LIST_SIZE; i++) {
      newBlankRows.push(i)
    }
    setBlankRows(newBlankRows)
  }, [search, items])

  return (
    <nav className="panel has-background-white">
      <p className="panel-heading has-background-primary">
        {title}
      </p>
      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="text" placeholder="Buscar" onChange={e => handleChange(e)} value={search} onKeyDown={e => onKeyDown(e)} autoFocus />
          <span className="icon is-left"><i className="fas fa-search" aria-hidden="true"></i></span>
        </p>
      </div>

      {filteredItems.map(item =>
        <a href="# " key={item.id}
          className="panel-block"
          onClick={() => handleClick(item)}
        >
          <span className="panel-icon">
            <i className={icon} aria-hidden="true"></i>
          </span>
          {`${item.name} ${item.description || ''}`}
        </a>
      )}

      {blankRows.length > 0 && blankRows.map((i, index) =>
        <a href="# " key={index} className="panel-block" > &nbsp; </a>
      )}

    </nav>
  )
}

export default Search