import axios from 'axios'
import { getData } from '../localStorage'

const api = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api/v1'
})

api.defaults.headers.common['Authorization'] = `Bearer ${getData('token')}`

export default api