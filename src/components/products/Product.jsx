import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import Confirm from '../common/Confirm'
import Form from '../common/Form'
import { getPrices, deletePrice, addPrice, savePrice } from '../../services/prices'
import { getProducts } from '../../services/products.js'
import { columns } from './list.json'
import { formatAmount, formatDate, formatDateShort } from '../../helpers'
import './product.scss'
import { fields } from './priceForm.json'

const Table = (props) => {
  return (
    <table className="table is-narrow">
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}

const RowTable = ({ item, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td>{item.supplierName}</td>
      <th>{formatAmount(item.price)}</th>
      <td>{formatDateShort(item.created)}</td>

      <td className="row-buttons">
        <button className="button has-text-info" onClick={() => handleEdit(item)} >
          <i className="fa fa-edit"></i>
        </button>

        <button className="button has-text-danger ml-1" onClick={() => handleDelete(item)}>
          <i className="fa fa-trash"></i>
        </button>
      </td>

    </tr>
  )
}

const Product = ({ barcode, close, confirmAdd }) => {
  const priceDefault = {
    supplierId: '',
    price: 0
  }

  const [form, setForm] = useState(priceDefault)
  const [product, setProduct] = useState({})
  const [prices, setPrices] = useState([])
  const [current, setCurrent] = useState(1)
  const [showConfirmAdd, setShowConfirmAdd] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [record, setRecord] = useState({})
  const [error] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if (barcode) {
      getProducts(barcode)
        .then(data => {
          setProduct(data.rows[0])
          if (!data.count) {
            setShowConfirmAdd(true)
          }
        })
        .catch(error => console.log(error))
    }
  }, [barcode])

  useEffect(() => {
    if (product && product.id) {
      getPrices(product.id)
        .then(prices => setPrices(prices.rows))
        .catch(error => console.log(error))
    }
  }, [product, update])

  const handleAdd = e => {
    e.preventDefault()
    setForm(priceDefault)
    setShowForm(true)
  }

  const handleEdit = item => {
    setForm(item)
    setShowForm(true)
  }

  const handleDelete = item => {
    setRecord(item)
    setShowConfirmDelete(true)
  }

  const confirmDelete = () => {
    deletePrice(record)
      .then(() => {
        setUpdate(!update)
        setShowConfirmDelete(false)
      })
      .catch(error => console.log(error))
  }

  const handleSave = form => {
    const item = { ...form, productId: product.id }
    if (item.id) {
      savePrice(item)
        .then(() => {
          setUpdate(!update)
          setShowForm(false)
        })
        .catch(error => console.log(error))
    } else {
      addPrice(item)
        .then(() => {
          setUpdate(!update)
          setShowForm(false)
        })
        .catch(error => console.log(error))
    }

  }

  const handleCancel = e => {
    setShowForm(false)
  }

  return (
    <div className="card my-3 mx-1">
      <header className="card-header has-background-primary">
        <p className="card-header-title">
          {product && columns
            .filter(col => col.isHeader)
            .map((col, index) => <span key={index}>{product[col.columnId]}&nbsp;</span>)
          }
        </p>
        <button className="delete" aria-label="close" onClick={close}></button>
      </header>
      <div className="tabs is-toggle is-fullwidth">
        <ul>
          <li className={current === 1 ? 'is-active' : ''} onClick={e => setCurrent(1)}>
            <a href="# ">
              <span>Info</span>
            </a>
          </li>
          <li className={current === 2 ? 'is-active' : ''} onClick={e => setCurrent(2)}>
            <a href="# ">
              <span>Precios</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="card-content product-card">
        <div className={`content ${current === 2 ? 'prices' : ''}`}>

          {current === 1 && product && columns
            .filter(col => !col.isHeader)
            .map((col, index) => {
              let value = product[col.columnId]
              if (col.className === 'dropdown-divider') return <div key={index} className="dropdown-divider" />
              if (!value) return null
              if (col.isDate) value = formatDate(value)
              if (col.isAmount) value = formatAmount(value)
              return (<div key={index}>
                {col.title && <span key={index} className="has-text-weight-medium">{col.title}: </span>}
                {value}
              </div>)
            })}

          {current === 2 &&
            <>
              <Table>
                {prices.map((price, index) => <RowTable handleEdit={handleEdit} handleDelete={handleDelete} key={index} item={price} />)}
              </Table>
              <button className="add-button button has-background-info has-text-white" onClick={e => handleAdd(e)}>
                <i className="fa fa-plus"></i>
              </button>
            </>
          }

        </div>
      </div>

      <Confirm
        title="Eliminando precio"
        isActive={showConfirmDelete}
        close={() => setShowConfirmDelete(false)}
        handleOk={confirmDelete}
        message={<span>Confirma eliminar el registro seleccionado?</span>}
        bgColor="danger"
      />

      <Confirm
        title="Código inexistente"
        isActive={showConfirmAdd}
        close={close}
        handleOk={confirmAdd}
        okText="Agregar"
        message={<span>Desea agregarlo al sistema?</span>}
      />

      <Modal
        isActive={showForm}
      >
        <Form
          formHeader="Nuevo precio"
          fields={fields}
          currentForm={form}
          handleSave={form => handleSave(form)}
          handleCancel={handleCancel}
          error={error}
        />
      </Modal>

    </div>
  )
}

export default Product