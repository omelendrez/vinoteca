import api from './api'
import { handleError } from '../helpers'

export const addDetail = detail => {
  return new Promise((resolve, reject) => {
    api.post('order_details', detail)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveDetail = detail => {
  return new Promise((resolve, reject) => {
    api.put(`order_details/${detail.id}`, detail)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteDetail = detail => {
  return new Promise((resolve, reject) => {
    api.delete(`order_details/${detail.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}