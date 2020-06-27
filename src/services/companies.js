import api from './api'
import { handleError } from '../helpers'

export const getCompanies = () => {
  return new Promise((resolve, reject) => {
    api.get('companies')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}