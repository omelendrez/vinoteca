import api from './api'
import { handleError } from '../helpers'

export const getInventoryVariationReasons = () => {
  return new Promise((resolve, reject) => {
    api.get('inventory_variation_reasons')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}