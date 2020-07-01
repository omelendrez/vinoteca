import api from './api'
import { handleError } from '../helpers'

export const getVariationReasons = () => {
  return new Promise((resolve, reject) => {
    api.get('inventory_variation_reasons')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const addVariationReason = variationReason => {
  return new Promise((resolve, reject) => {
    api.post('inventory_variation_reasons', variationReason)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveVariationReason = variationReason => {
  return new Promise((resolve, reject) => {
    api.put(`inventory_variation_reasons/${variationReason.id}`, variationReason)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteVariationReason = variationReason => {
  return new Promise((resolve, reject) => {
    api.delete(`inventory_variation_reasons/${variationReason.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}