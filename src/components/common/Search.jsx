import React, { useState, useEffect } from 'react'

const Search = ({ title, current, items, selectItem, icon }) => {
  const ENTER = 13 // Valor ASCII de la tecla Enter
  const ESC = 27 // Valor ASCII de la tecla Escape
  const LIST_SIZE = 10 // Límite máximo de items a mostrar en la búsqueda
  const [search, setSearch] = useState('') // Aquí guardamos lo que el usuario está tipeando (handleChange)
  const [filteredItems, setFilteredItems] = useState([]) // Los ítems que se van a mostrar
  const [blankRows, setBlankRows] = useState([]) // Si los ítems a mostrar son menos que el límite máximo (LIST_SIZE) agregaremos renglones en blanco

  const handleChange = e => {
    e.preventDefault()
    setSearch(e.target.value) // Como siempre guardamos lo que el usuario va tipeando dentro de la variable de estado 'search'
  }

  const handleClick = item => { // El usuario ha hecho click (o touch en el teléfono) en una de los items de la lista
    selectItem(item) // Mandamos el item seleccionado al componente padre (OrderDetails) usando la función 'selectItem' que nos pasó
  }

  const cancel = () => {
    selectItem({})
  }

  const onKeyDown = e => { // En el campo de búsqueda el usuario ha presionado alguna tecla
    var keycode = (e.keyCode ? e.keyCode : e.which)  // Obtenemos el código ASCII de la tecla presionada
    if (keycode === ENTER && filteredItems.length === 1) { // Si presionó Enter y en la list hay un solo item, podemos devolverlo a OrderDetails
      setSearch(filteredItems[0].name) // Completamos el input de búsqueda con el nombre completo del item encontrado
      setTimeout(() => {
        setSearch('')
        selectItem(filteredItems[0])
      }, 200) // Aplicamos un delay de 200 milisegundos para que el usuario vea el nombre completo del item en el campo de búsqueda antes que el modal se cierre
    }
    if (keycode === ESC) { // Si presioné Escape entonces devolvemos un objeto vacío (no se seleccionó nada y podemos cerrar el componente)
      setSearch('')
      cancel()
    }
  }

  useEffect(() => {
    // Items contiene la lista completa de items existentes en la base de datos, pero no la vamos a mostrar toda
    // Sólo items que coinciden con en el texto de búsqueda si el texto tiene algo
    // Para eso creamos filteredItems que es la verdadera lista a mostrar
    const filteredItems = items
      .map(item => {
        item.isActive = item.id === current // Si OrderDetail pasó un id de item es porque estamos editando vamos a marcar el item con ese id como activo
        if (item.description) { // Si el item tiene descripción (product) se la agregamos al nombre para una búsqueda más completa
          item.fullName = item.name + ' ' + item.description // Esa combinación la llamamos fullName y la mostramos abajo sólo si existe
        }
        return item
      })
      .filter(item => {
        const itemName = item.fullName || item.name // Aquí vemos si existe fullName y si no pasamos sólo name
        return itemName.toLowerCase().includes(search.toLowerCase()) || !search
      })

    setFilteredItems(filteredItems.slice(0, LIST_SIZE)) // Cortamos la array mostrando sólo los primeros LIST_SIZE items

    /*
    Deprecated: Se comporta raro tratando de borrar con backspace lo que se escribió en la búsqueda
    if (filteredItems.length === 1) { // Durante la búsqueda si sólo se muestra un item, hemos encontrado lo que buscamos
      setSearch(filteredItems[0].name) // Actualizamos el campo de búsqueda con el nombre completo de lo encontrado
    }
    */

    const newBlankRows = [] // Aquí generaremos renglones en blanco si la lista de items encontrados es menor a LIST_SIZE
    for (let i = filteredItems.length; i < LIST_SIZE; i++) {
      newBlankRows.push(i)
    }
    setBlankRows(newBlankRows)

  }, [items, search, current]) // Monitoreamos la lista de items que nos pasó OrderDetails y el input 'search' donde el usuario va a tipear su búsqueda

  return (
    <nav className="panel has-background-white">
      <p className="panel-heading has-background-primary">
        <button className="delete is-pulled-right" onClick={() => cancel()}></button>
        {title}
      </p>
      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="text" placeholder="Buscar" onChange={e => handleChange(e)} value={search} onKeyDown={e => onKeyDown(e)} />
          <span className="icon is-left"><i className="fas fa-search" aria-hidden="true"></i></span>
        </p>
      </div>

      {filteredItems.map(item =>
        <a href="# " key={item.id}
          className={`panel-block ${item.isActive ? 'is-active' : ''}`}
          onClick={() => handleClick(item)}
        >
          <span className="panel-icon">
            <i className={icon} aria-hidden="true"></i>
          </span>
          {item.fullName || item.name} {/** Sólo producto tiene fullName generado arriba */}
        </a>
      )}

      {blankRows.length > 0 && blankRows.map((i, index) =>
        <a href="# " key={index} className="panel-block" > &nbsp; </a>
      )}

    </nav>
  )
}

export default Search