import api from "./api"
import { handleError } from "../helpers"

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    api.get("products")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}
