import React, { useState, useEffect } from 'react'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getUsers } from '../../services/users'
import { formatDateFull } from '../../helpers'

const Users = () => {
  const [users, setUsers] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then(users => {
        setUsers(users)
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

  const handleEdit = (e, user) => {
    e.preventDefault()
    console.log(user)
  }

  const handleDelete = (e, user) => {
    e.preventDefault()
    console.log(user)
  }

  const { rows } = users
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Usuarios"
        subTitle="Admnistración de usuarios"
        width="is-6"
        background="is-primary"
      >
        {rows && rows.map((user, index) => {
          const { name, email, created } = user
          return (
            <TableItem
              key={index}
              item={user}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
              <TableItemField icon="fa fa-at mr-2" value={email} />
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

export default Users