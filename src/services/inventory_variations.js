import api from './api'
import { handleError } from '../helpers'

export const addInventoryVariation = inventoryVariation => {
  return new Promise((resolve, reject) => {
    api.post('inventory_variations', inventoryVariation)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}