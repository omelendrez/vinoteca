import api from './api'
import { handleError } from '../helpers'

export const getSuppliers = () => {
  return new Promise((resolve, reject) => {
    api.get('suppliers')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveSupplier = supplier => {
  return new Promise((resolve, reject) => {
    api.post('suppliers', supplier)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteSupplier = supplier => {
  return new Promise((resolve, reject) => {
    api.delete(`suppliers/${supplier.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}