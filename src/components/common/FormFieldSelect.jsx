import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Search from './Search'
import { getProducts } from '../../services/products'
import { getStores } from '../../services/stores'

const FormFieldSelect = ({ label, icon, fieldId, fieldValue, options, current, selectItem }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [optionsList, setOptionsList] = useState([])
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    switch (options) {
      case 'products':
        getProducts()
          .then(optionsList => setOptionsList(optionsList.rows))
        break
      case 'stores':
        getStores()
          .then(optionsList => setOptionsList(optionsList.rows))
        break
      default:
    }

  }, [options])

  const handleSelect = item => {
    const selectValue = optionsList.find(option => option.id === item.id).name
    setSelectValue(selectValue)
    setShowSearch(false)
    if (item) {
      selectItem(fieldId, item)
    }
  }
  const handleClick = e => {
    e.preventDefault()
    setShowSearch(true)
  }

  return (
    <>
      <div className="field">
        <label className="label">{label}</label>
        <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
          {icon ? <span className="icon is-small is-left"><i className={icon}></i></span> : ''}
          <input type="text" className="input" defaultValue={selectValue} onClick={e => handleClick(e)}></input>
        </div>
      </div>
      <Modal isActive={showSearch}>
        <Search title={label} current={current} icon="fas fa-wine-bottle" items={optionsList} selectItem={item => handleSelect(item)} />
      </Modal>
    </>
  )
}
export default FormFieldSelect