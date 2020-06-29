import api from "./api"
import { handleError } from "../helpers"

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    api.get("categories")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}
