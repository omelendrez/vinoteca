import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import List from '../common/List'
import Confirm from '../common/Confirm'
import { getSuppliers, deleteSupplier } from '../../services/suppliers'
import { columns } from './list.json'
const Suppliers = () => {
  const [suppliers, setSuppliers] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [supplier, setSupplier] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getSuppliers()
      .then(suppliers => {
        setSuppliers(suppliers)
        setIsLoading(false)
        if (!suppliers.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch(error => {
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }, [update])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, supplier) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-supplier', state: { supplier } })
  }

  const handleDelete = (e, supplier) => {
    e.preventDefault()
    setSupplier(supplier)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteSupplier(supplier)
      .then(() => {
        setSupplier({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setSupplier({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = suppliers
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Proovedores"
        subTitle="Admnistración de proveedores"
        width="is-6"
        background="is-primary"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-supplier')}>
          Agregar
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando proveedor"
          message={<span>Confirma eliminación de proovedor <strong>{supplier.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={supplier.id}
          close={() => setSupplier({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Suppliers