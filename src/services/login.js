import api from './api'

export const login = user => {
  return new Promise((resolve, reject) => {
    api.post('login', user)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}