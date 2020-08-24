import moment from 'moment'
import 'moment/locale/es'
import { deleteData } from './localStorage'

// Estos campos no se envían al backend con post o put
const fieldsToRemove = [
  'companyName',
  'profileName',
  'productName',
  'productDescription',
  'total',
  'categoryName',
  'storeName',
  'created',
  'createdByName',
  'updated',
  'updatedByName',
  'statusName',
  'confirmPassword'
]

// Estos campos no se envían al backend con put si están vacíos
const fieldsToRemoveIfEmpty = [
  'lastPurchaseDate',
  'lastSaleDate'
]

export const formatDate = date => moment(date).format('L')

export const formatDateShort = date => moment(date).format('DD/MM/YY')

export const formatDateFull = date => moment(date).format('DD-MM-YYYY HH:mm:ss')

export const formatDateFromNow = date => moment(date).calendar()

export const handleError = error => {
  window.navigator.vibrate(200)
  if (error.response && error.response.data && error.response.data.message) {
    if (error.response.data.code === 'token') {
      deleteData('token')
      deleteData('user')
      return window.location.reload()
    }
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
  fieldsToRemove.forEach(name => result[name] = undefined)
  fieldsToRemoveIfEmpty.forEach(name => {
    if (!result[name]) {
      result[name] = undefined
    }
  })
  return result
}

export const formatAmount = amount => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount)

export const toTop = () => {

  const container = document.getElementsByClassName('list-container')
  container[0].scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}