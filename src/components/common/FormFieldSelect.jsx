import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Search from './Search'
import { getProducts } from '../../services/products'
import { getStores } from '../../services/stores'
import { getCategories } from '../../services/categories'
import { getVariationReasons } from '../../services/variation_reasons'
import { getSuppliers } from '../../services/suppliers'
import { getCompanies } from '../../services/companies'
import { getProfiles } from '../../services/profiles'

const FormFieldSelect = ({ label, icon, fieldId, options, current, selectItem, readOnly, error }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [optionsList, setOptionsList] = useState([])
  const [fieldValue, setFieldValue] = useState('')
  let message = ''
  let color = ''

  if (error) {
    color = error[0]
    message = error[1]
  }

  useEffect(() => {
    switch (options) {
      case 'products':
        getProducts()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'stores':
        getStores()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'categories':
        getCategories()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'variationReasons':
        getVariationReasons()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'variationTypes':
        setOptionsList([{ id: 1, name: 'Incrementa stock' }, { id: -1, name: 'Disminuye stock' }])
        break
      case 'suppliers':
        getSuppliers()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'companies':
        getCompanies()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      case 'profiles':
        getProfiles()
          .then(optionsList => setOptionsList(optionsList.rows))
          .catch(error => console.log(error))
        break
      default:
    }
  }, [options])

  useEffect(() => {
    if (optionsList) {
      const name = optionsList.find(option => current === option.id)
      if (name) {
        setFieldValue(name.name)
      } else {
        setFieldValue('')
      }
    }
  }, [current, optionsList])

  const handleSelect = item => {
    if (item.id) {
      const fieldValue = optionsList.find(option => option.id === item.id).name
      setFieldValue(fieldValue)
    }
    setShowSearch(false)
    selectItem(fieldId, item)
  }

  const handleClick = e => {
    e.preventDefault()
    if (!readOnly) {
      setShowSearch(true)
    }
  }

  return (
    <>
      <div className="field">
        <label className="label">{label}</label>
        <div className={`control ${icon ? 'has-icons-left has-icons-right' : ''}`}>
          {icon ? <span className="icon is-small is-left"><i className={icon}></i></span> : ''}
          <input type="text" className={`input ${color}`} readOnly={readOnly} defaultValue={fieldValue} readOnly onClick={e => handleClick(e)}></input>
        </div>
        <p className={`help ${color}`} >{message}&nbsp;</p>

      </div>
      <Modal isActive={showSearch}>
        <Search title={label} current={current} icon={icon || "fas fa-wine-bottle"} items={optionsList} selectItem={item => handleSelect(item)} />
      </Modal>
    </>
  )
}
export default FormFieldSelect