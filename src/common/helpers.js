import moment from 'moment'

export const formatDate = (date) => {
  moment().locale('pt-br')
  const formated = moment(date).format('LLL')
  return formated
}
