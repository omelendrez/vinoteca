import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import Confirm from '../common/Confirm'
import { getSuppliers, deleteSupplier } from '../../services/suppliers'
import { formatDateFull } from '../../helpers'

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

  const handleDelete = async (e, supplier) => {
    e.preventDefault()
    setSupplier(supplier)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteSupplier(supplier)
    setSupplier({})
    setUpdate(!update)
  }

  const { rows } = suppliers
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Proovedores"
        subTitle="Admnistración de proveedores"
        width="is-6"
        background="is-primary"
      >
        <button className="button" onClick={() => setRedirect('/add-supplier')}>
          Agregar
        </button>
        {rows && rows.map((supplier, index) => {
          const { name, contact, address, email, phone, created, updated } = supplier
          return (
            <TableItem
              key={index}
              item={supplier}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
              <TableItemField icon="fa fa-user mr-2" value={contact} />
              <TableItemField icon="fa fa-map-marker-alt mr-2" value={address} />
              <TableItemField icon="fa fa-at mr-2" value={email} />
              <TableItemField icon="fa fa-phone mr-2" value={phone} />
              <br />
              <br />
              <TableItemField
                icon="fa fa-calendar-alt mr-2"
                label="Creado"
                value={formatDateFull(created)}
              />
              {created !== updated &&
                <TableItemField
                  label="Modificado"
                  icon="fa fa-calendar-alt mr-2"
                  value={formatDateFull(updated)}
                />
              }
            </TableItem>
          )
        })
        }
        <Confirm
          title="Eliminando proveedor"
          message={<span>Confirma eliminación de proovedor <strong>{supplier.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={supplier.id}
          close={() => setSupplier({})}
        />

      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default Suppliers