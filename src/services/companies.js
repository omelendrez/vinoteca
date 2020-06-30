import api from './api'
import { handleError } from '../helpers'

export const getCompanies = () => {
  return new Promise((resolve, reject) => {
    api.get('companies')
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const addCompany = company => {
  return new Promise((resolve, reject) => {
    api.post('companies', company)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const saveCompany = company => {
  return new Promise((resolve, reject) => {
    api.put(`companies/${company.id}`, company)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}

export const deleteCompany = company => {
  return new Promise((resolve, reject) => {
    api.delete(`companies/${company.id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(handleError(error)))
  })
}