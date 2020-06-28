import api from './api'
import { handleError } from '../helpers'

export const getVariationReasons = () => {
  return new Promise((resolve, reject) => {
    api.get('inventory_variation_reasons')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}