import api from './api'
import { handleError } from '../helpers'

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    api.get('users')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveUser = user => {
  return new Promise((resolve, reject) => {
    api.post('users', user)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteUser = user => {
  return new Promise((resolve, reject) => {
    api.delete(`users/${user.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}