import api from './api'
import { handleError } from '../helpers'

export const getProfiles = () => {
  return new Promise((resolve, reject) => {
    api.get('profiles')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}