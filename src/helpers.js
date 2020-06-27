import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('L')

export const formatDateFull = dateTime => moment(dateTime).format('l LT')
