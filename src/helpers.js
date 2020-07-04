import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('L')

export const formatDateFull = dateTime => moment(dateTime).format('DD-MM-YYYY HH:mm:ss')

export const handleError = error => {
  console.log('Error!', error)
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data
  }
  return ({ message: 'Error interno del servidor' })
}

export const cleanData = data => {
  const result = { ...data }
  result.companyName = undefined
  result.profileName = undefined
  result.categoryName = undefined
  result.created = undefined
  result.createdByName = undefined
  result.updated = undefined
  result.updatedByName = undefined
  result.statusName = undefined
  result.confirmPassword = undefined
  if (!result.lastPurchaseDate) result.lastPurchaseDate = undefined
  if (!result.lastSaleDate) result.lastSaleDate = undefined
  return result
}