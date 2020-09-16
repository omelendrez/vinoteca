import api from "./api"
import { handleError } from "../helpers"

export const getSales = () => {
  return new Promise((resolve, reject) => {
    api
      .get("sales")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const getSale = id => {
  return new Promise((resolve, reject) => {
    api.get(`sales/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const addSale = order => {
  return new Promise((resolve, reject) => {
    api.post('sales', order)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteSale = order => {
  return new Promise((resolve, reject) => {
    api.delete(`sales/${order.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const sendSale = order => {
  return new Promise((resolve, reject) => {
    api.post(`send-order/${order.id}`, order)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}
