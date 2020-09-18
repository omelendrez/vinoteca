import api from './api'
import { handleError } from '../helpers'

export const getInventory = () => {
  return new Promise((resolve, reject) => {
    api.get('inventory')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const getAvailability = params => {
  const { storeId, productId } = params
  return new Promise((resolve, reject) => {
    api.get(`inventory/${storeId}/${productId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}