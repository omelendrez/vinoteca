import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import List from '../common/List'
import Footer from '../common/Footer'
import Confirm from '../common/Confirm'
import { getStores, deleteStore } from '../../services/stores'
import { columns } from './list.json'

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
        if (!stores.count) {
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

  const handleEdit = (e, store) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-store', state: { store } })
  }

  const handleDelete = (e, store) => {
    e.preventDefault()
    setStore(store)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteStore(store)
      .then(() => {
        setStore({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setStore({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = stores
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Depósitos"
        subTitle="Listado de depósitos asociados"
        width="is-6"
        background="is-warning"
      >

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando depósito"
          message={<span>¿Confirma eliminación del depósito <strong>{store.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={store.id}
          close={() => setStore({})}
        />

        {isLoading && <Loading />}

      </Container>
      <Footer
        onAdd={() => setRedirect('/add-store')}
        onTop="true"
      />

    </>
  )
}

export default Stores