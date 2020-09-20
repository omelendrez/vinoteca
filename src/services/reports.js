import api from "./api"
import { handleError } from "../helpers"

export const getGraphData = () => {
  return new Promise((resolve, reject) => {
    api
      .post("graph-data")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)))
  })
}
