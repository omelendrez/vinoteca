import api from './api'
import { handleError } from '../helpers'

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    api.get('users')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}