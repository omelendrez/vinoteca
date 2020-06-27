import api from './api'
import { handleError } from '../helpers'

export const login = user => {
  return new Promise((resolve, reject) => {
    api.post('login', user)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}