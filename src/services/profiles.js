import api from './api'
import { handleError } from '../helpers'

export const getProfiles = () => {
  return new Promise((resolve, reject) => {
    api.get('profiles')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const addProfile = profile => {
  return new Promise((resolve, reject) => {
    api.post('profiles', profile)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveProfile = profile => {
  return new Promise((resolve, reject) => {
    api.put(`profiles/${profile.id}`, profile)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteProfile = profile => {
  return new Promise((resolve, reject) => {
    api.delete(`profiles/${profile.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}