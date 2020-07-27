import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import List from '../common/List'
import Confirm from '../common/Confirm'
import { getUsers, deleteUser } from '../../services/users'
import { columns } from './list.json'

const Users = () => {
  const [users, setUsers] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then(users => {
        setUsers(users)
        setIsLoading(false)
        if (!users.count) {
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

  const handleEdit = (e, user) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-user', state: { user } })
  }

  const handleDelete = (e, user) => {
    e.preventDefault()
    setUser(user)
  }
  const confirmDelete = () => {
    setIsLoading(true)
    deleteUser(user)
      .then(() => {
        setUser({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setUser({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = users

  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Usuarios"
        subTitle="Administración de usuarios"
        width="is-6"
        background="is-primary"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-user')}>
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
          title="Eliminando usuario"
          message={<span>Confirma eliminación del usuario <strong>{user.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={user.id}
          close={() => setUser({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Users