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

export const addSale = sale => {
  return new Promise((resolve, reject) => {
    api.post('sales', sale)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteSale = sale => {
  return new Promise((resolve, reject) => {
    api.delete(`sales/${sale.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const confirmSale = sale => {
  return new Promise((resolve, reject) => {
    api.put(`confirm-sale/${sale.id}`, sale)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}
