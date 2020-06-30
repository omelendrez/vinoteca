import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('L')

export const formatDateFull = dateTime => moment(dateTime).format('l LT')

export const handleError = error => {
  console.log(error)
  if (error.response && error.response.data) {
    return error.response.data
  }
  return ({ message: 'Error de conexión' })
}

export const cleanData = data => {
  delete data.created
  delete data.updated
  return data
}