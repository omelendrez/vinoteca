import api from "./api"
import { handleError } from "../helpers"

export const getStores = () => {
  return new Promise((resolve, reject) => {
    api.get("stores")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const saveStore = store => {
  return new Promise((resolve, reject) => {
    api.post('stores', store)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteStore = store => {
  return new Promise((resolve, reject) => {
    api.delete(`stores/${store.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}