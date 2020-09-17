import api from './api'
import { handleError } from '../helpers'

export const addDetail = detail => {
  return new Promise((resolve, reject) => {
    api.post('sale-details', detail)
      .then(response => {
        const { data: item } = response.data
        updateDetails(detail)
          .then(() => {
            api.get(`sale-details/${item.id}`)
              .then(response => resolve(response))
          })
      })
      .catch(error => reject(handleError(error)))
  })
}

export const saveDetail = detail => {
  return new Promise((resolve, reject) => {
    api.put(`sale-details/${detail.id}`, detail)
      .then(() => {
        updateDetails(detail)
          .then(() => {
            api.get(`sale-details/${detail.id}`)
              .then(response => resolve(response.data))
          })
      })
      .catch(error => reject(handleError(error)))
  })
}

export const deleteDetail = detail => {
  return new Promise((resolve, reject) => {
    api.delete(`sale-details/${detail.id}`)
      .then(response => {
        updateDetails(detail)
        resolve(response.data)
      })
      .catch(error => reject(handleError(error)))
  })
}

export const updateDetails = detail => {
  return new Promise((resolve, reject) => {
    api.post('sale-details-update', detail)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}