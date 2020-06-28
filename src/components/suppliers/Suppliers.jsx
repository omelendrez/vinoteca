import React, { useState, useEffect } from 'react'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getSuppliers } from '../../services/suppliers'
import { formatDateFull } from '../../helpers'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
  }, [])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, supplier) => {
    e.preventDefault()
    console.log(supplier)
  }

  const handleDelete = (e, supplier) => {
    e.preventDefault()
    console.log(supplier)
  }

  const { rows } = suppliers
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Proovedores"
        subTitle="Admnistración de empresas"
        width="is-6"
        background="is-primary"
      >
        {rows && rows.map((supplier, index) => {
          const { name, contact, address, email, phone, created } = supplier
          return (
            <TableItem key={index} item={supplier} itemHeader={name} handleEdit={handleEdit} handleDelete={handleDelete}>
              <TableItemField icon="fa fa-user mr-2" value={contact} />
              <TableItemField icon="fa fa-map-marker-alt mr-2" value={address} />
              <TableItemField icon="fa fa-at mr-2" value={email} />
              <TableItemField icon="fa fa-phone mr-2" value={phone} />
              <br />
              <TableItemField icon="fa fa-calendar-alt mr-2" value={formatDateFull(created)} />
            </TableItem>
          )
        })
        }
      </Container>

      {isLoading && <Loading />}

    </>
  )
}

export default Suppliers