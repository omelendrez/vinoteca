import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import TableFooter from '../common/TableFooter'
import Confirm from '../common/Confirm'
import { getUsers, deleteUser } from '../../services/users'

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

        <Notification message={alert.message} clear={clearAlert} type={alert.type} />

        <div className="container list-container">

          {rows && rows.map((user, index) => {
            const { companyName, profileName, name, email, statusName, created, createdByName, updated, updatedByName } = user
            return (
              <TableItem
                key={index}
                item={user}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField icon="fa fa-building mr-2" value={companyName} />
                <TableItemField icon="fa fa-users mr-2" value={profileName} />
                <TableItemField icon="fa fa-at mr-2" value={email} />

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