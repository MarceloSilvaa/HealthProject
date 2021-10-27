export function isBeforeToday(date) {
  let today = new Date()
  today.setHours(0, 0, 0, 0)

  if(date.valueOf() < today.valueOf()) {
    return true;
  }

  return false;
}

export function goesBackOneYear(date) {
  let lastYear = new Date()
  lastYear.setFullYear(lastYear.getFullYear() - 1)

  //Verify if the date goes back no longer than one year
  if(date.valueOf() >= lastYear.valueOf()) {
    return true;
  }

  return false;
}

export function stringToDate(str, setTimeToZero) {
  let aux = str.split("-")
  let date = new Date(aux[0], aux[1] - 1, aux[2])
  if(setTimeToZero) {
    date.setHours(0, 0, 0, 0)
  }
  return date
}

export function dateToString(date) {
  let str = date.getFullYear() + "-"

  if(date.getMonth() + 1 < 10) {
    str += "0" + (date.getMonth() + 1) + "-"
  }
  else {
    str += (date.getMonth() + 1) + "-"
  }

  if(date.getDate() < 10) {
    str += "0" + date.getDate()
  }
  else {
    str += date.getDate()
  }

  return str
}