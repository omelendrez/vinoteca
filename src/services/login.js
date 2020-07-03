import api from './api'
import { handleError } from '../helpers'

export const login = user => {
  return new Promise((resolve, reject) => {
    api.post('login', user)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const forgotPassword = user => {
  return new Promise((resolve, reject) => {
    api.post('emails', user)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}