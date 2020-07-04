import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import TableFooter from '../common/TableFooter'
import Confirm from '../common/Confirm'
import { getStores, deleteStore } from '../../services/stores'

const Stores = () => {
  const [stores, setStores] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [store, setStore] = useState({})

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
    setRedirect({ pathname: '/edit-store', state: { store } })
  }

  const handleDelete = async (e, store) => {
    e.preventDefault()
    setStore(store)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteStore(store)
    setStore({})
    setUpdate(!update)
  }

  const { rows } = stores
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Depósitos"
        subTitle="Listado de depósitos asociados"
        width="is-6"
        background="is-warning"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-store')}>
          Agregar
        </button>

        <div className="container list-container">

          {rows && rows.map((store, index) => {
            const { name, contact, address, phone, email, statusName, created, createdByName, updated, updatedByName } = store
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
                <TableFooter
                  statusName={statusName}
                  created={created}
                  createdByName={createdByName}
                  updated={updated}
                  updatedByName={updatedByName}
                />

              </TableItem>
            )
          })
          }
        </div>

        <Confirm
          title="Eliminando depósito"
          message={<span>¿Confirma eliminación del depósito <strong>{store.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={store.id}
          close={() => setStore({})}
        />

      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default Stores