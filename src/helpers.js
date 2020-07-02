import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('L')

export const formatDateFull = dateTime => moment(dateTime).format('DD-MM-YYYY HH:mm:ss')

export const handleError = error => {
  console.log(error)
  if (error.response && error.response.data) {
    return error.response.data
  }
  return ({ message: 'Error de conexión' })
}

export const cleanData = data => {
  const result = { ...data }
  result.created = undefined
  result.updated = undefined
  result.confirmPassword = undefined
  if (!result.lastPurchaseDate) result.lastPurchaseDate = undefined
  if (!result.lastSaleDate) result.lastSaleDate = undefined
  return result
}