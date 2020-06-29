import React, { useState, useEffect } from 'react'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getStores, deleteStore } from '../../services/stores'
import { formatDateFull } from '../../helpers'

const Stores = () => {
  const [stores, setStores] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getStores()
      .then(stores => {
        setStores(stores)
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

  const handleEdit = (e, store) => {
    e.preventDefault()
    console.log(store)
  }

  const handleDelete = async (e, store) => {
    e.preventDefault()
    setIsLoading(true)
    await deleteStore(store)
    setUpdate(!update)
  }

  const { rows } = stores
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Depósitos"
        subTitle="Listado de depósitos asociados"
        width="is-6"
        background="is-warning"
      >
        {rows && rows.map((store, index) => {
          const { name, contact, address, phone, email, created } = store
          return (
            <TableItem
              key={index}
              item={store}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
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

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default Stores