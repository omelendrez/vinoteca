import api from "./api"
import { handleError } from "../helpers"

export const getProducts = (search) => {
  return new Promise((resolve, reject) => {
    api
      .get(`products?search=${search || ''}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const getProduct = (product) => {
  return new Promise((resolve, reject) => {
    api
      .get(`products/${product.productId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}


export const addProduct = (product) => {
  return new Promise((resolve, reject) => {
    api
      .post("products", product)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const saveProduct = (product) => {
  return new Promise((resolve, reject) => {
    api
      .put(`products/${product.id}`, product)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const deleteProduct = (product) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`products/${product.id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}

export const getLowStockProducts = () => {
  return new Promise((resolve, reject) => {
    api
      .get("low-stock-products")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}
