import api from './api'
import { handleError } from '../helpers'

export const getSuppliers = () => {
  return new Promise((resolve, reject) => {
    api.get('suppliers')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}