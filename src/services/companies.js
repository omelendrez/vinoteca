import api from './api'

export const getCompanies = () => {
  return new Promise((resolve, reject) => {
    api.get('companies')
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}