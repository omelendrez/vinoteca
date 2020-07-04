import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('L')

export const formatDateFull = date => moment(date).format('DD-MM-YYYY HH:mm:ss')

export const formatDateFromNow = date => moment(date).fromNow()

export const handleError = error => {
  window.navigator.vibrate(200)
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data
  }
  if (error.response.data) {
    if (error.response.data.error && error.response.data.error.sqlMessage) {
      return ({ message: error.response.data.error.sqlMessage })
    }
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

export const formatAmount = amount => `$ ${amount.toFixed(2)}`