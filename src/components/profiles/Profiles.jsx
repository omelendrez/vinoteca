import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import List from '../common/List'
import Confirm from '../common/Confirm'
import { getProfiles, deleteProfile } from '../../services/profiles'
import { columns } from './list.json'

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
        if (!profiles.count) {
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

  const handleEdit = (e, profile) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-profile', state: { profile } })
  }

  const handleDelete = (e, profile) => {
    e.preventDefault()
    setProfile(profile)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteProfile(profile)
      .then(() => {
        setProfile({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setProfile({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = profiles

  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Perfiles de usuario"
        subTitle="Administración de perfiles de usuario"
        width="is-6"
        background="is-primary"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-profile')}>
          Agregar
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          rows={rows}
        />

        <Confirm
          title="Eliminando perfil"
          message={<span>¿Confirma eliminación del perfil <strong>{profile.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={profile.id}
          close={() => setProfile({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Profiles