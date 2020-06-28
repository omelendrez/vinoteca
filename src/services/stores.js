import api from "./api"
import { handleError } from "../helpers"

export const getStores = () => {
  return new Promise((resolve, reject) => {
    api
      .get("stores")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}
