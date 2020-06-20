import axios from 'axios'

export default axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api/v1'
})