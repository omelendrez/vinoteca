import React, { useState, useEffect } from 'react'
import Container from '../common/Container'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getProfiles, deleteProfile } from '../../services/profiles'
import { formatDateFull } from '../../helpers'

const Profiles = () => {
  const [profiles, setProfiles] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getProfiles()
      .then(profiles => {
        setProfiles(profiles)
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

  const handleEdit = (e, profile) => {
    e.preventDefault()
    console.log(profile)
  }

  const handleDelete = async (e, profile) => {
    e.preventDefault()
    setIsLoading(true)
    await deleteProfile(profile)
    setUpdate(!update)
  }

  const { rows } = profiles

  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Perfiles de usuario"
        subTitle="Administración de perfiles de usuario"
        width="is-6"
        background="is-primary"
      >
        {rows && rows.map((profile, index) => {
          const { code, name, created } = profile
          return (
            <TableItem
              key={index}
              item={profile}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
              <TableItemField label="Código" value={code} />
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

export default Profiles