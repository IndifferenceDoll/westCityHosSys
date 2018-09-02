// 返回日期对象工具函数
function _getDateObj (date) {
  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
    day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    hour: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    minute: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    second: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }
}

export function getDate (date = new Date(), split = '-') {
  let dateObj = _getDateObj(date)
  return `${dateObj.year}${split}${dateObj.month}${split}${dateObj.day}`
}

export function getDatetime (date = new Date(), split = '-') {
  let dateObj = _getDateObj(date)
  return `${dateObj.year}${split}${dateObj.month}${split}${dateObj.day} ${dateObj.hour}:${dateObj.minute}:${dateObj.second}`
}

export default {
  getDate,
  getDatetime
}
