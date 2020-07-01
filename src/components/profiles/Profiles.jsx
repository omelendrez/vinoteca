import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import Confirm from '../common/Confirm'
import { getProfiles, deleteProfile } from '../../services/profiles'
import { formatDateFull } from '../../helpers'

const Profiles = () => {
  const [profiles, setProfiles] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [profile, setProfile] = useState({})

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
    setRedirect({ pathname: '/edit-profile', state: { profile } })
  }

  const handleDelete = async (e, profile) => {
    e.preventDefault()
    setProfile(profile)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteProfile(profile)
    setProfile({})
    setUpdate(!update)
  }

  const { rows } = profiles

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Perfiles de usuario"
        subTitle="Administración de perfiles de usuario"
        width="is-6"
        background="is-primary"
      >
        <button className="button" onClick={() => setRedirect('/add-profile')}>
          Agregar
        </button>
        {rows && rows.map((profile, index) => {
          const { code, name, created, updated } = profile
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
          title="Eliminando perfil"
          message={<span>¿Confirma eliminación del perfil <strong>{profile.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={profile.id}
          close={() => setProfile({})}
        />
      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default Profiles