import api from "./api"
import { handleError } from "../helpers"

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    api
      .get("orders")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const getOrder = id => {
  return new Promise((resolve, reject) => {
    api.get(`orders/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const addOrder = order => {
  return new Promise((resolve, reject) => {
    api.post('orders', order)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteOrder = order => {
  return new Promise((resolve, reject) => {
    api.delete(`orders/${order.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const sendOrder = order => {
  return new Promise((resolve, reject) => {
    api.post(`send-order/${order.id}`, order)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const cancelOrder = order => {
  return new Promise((resolve, reject) => {
    api.post(`cancel-order/${order.id}`, order)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}