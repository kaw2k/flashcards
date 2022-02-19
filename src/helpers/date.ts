export function getFullDate(num: number) {
  return `${getDay(num)}, ${getMonth(num)} ${getDate(num)}, ${getYear(num)}`
}

export function getMonthYear(num: number) {
  return `${getMonth(num)} ${getYear(num)}`
}

export function getDate(num: number) {
  const date = new Date(num)
  return date.getDate()
}

export function getDay(num: number) {
  const date = new Date(num)

  let weekDay: number | string = date.getDay()
  if (weekDay === 0) weekDay = 'Sunday'
  if (weekDay === 1) weekDay = 'Monday'
  if (weekDay === 2) weekDay = 'Tuesday'
  if (weekDay === 3) weekDay = 'Wednesday'
  if (weekDay === 4) weekDay = 'Thursday'
  if (weekDay === 5) weekDay = 'Friday'
  if (weekDay === 6) weekDay = 'Saturday'

  return weekDay
}

export function getYear(num: number) {
  const date = new Date(num)
  return date.getFullYear()
}

export function getMonth(num: number) {
  const date = new Date(num)
  let month: number | string = date.getMonth()
  if (month === 0) month = 'January'
  if (month === 1) month = 'February'
  if (month === 2) month = 'March'
  if (month === 3) month = 'April'
  if (month === 4) month = 'May'
  if (month === 5) month = 'June'
  if (month === 6) month = 'July'
  if (month === 7) month = 'August'
  if (month === 8) month = 'September'
  if (month === 9) month = 'October'
  if (month === 10) month = 'November'
  if (month === 11) month = 'December'
  return month
}
