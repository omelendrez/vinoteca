import api from './api'
import { handleError } from '../helpers'

export const getInventoryVariations = () => {
  return new Promise((resolve, reject) => {
    api.get("inventory_variations")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const addInventoryVariation = inventoryVariation => {
  return new Promise((resolve, reject) => {
    api.post('inventory_variations', inventoryVariation)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}