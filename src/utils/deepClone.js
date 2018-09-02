export function deepClone (obj) { // 深复制
  if (!obj) {
    return ''
  }
  if (typeof obj !== 'object') {
    return obj
  }
  var newObj = obj.constructor === Array ? [] : {}
  for (var key in obj) {
    // if (obj[key]) {
    if (obj[key] && typeof obj[key] === 'object') {
      newObj[key] = obj[key].constructor === Array ? [] : {} // 递归
      newObj[key] = deepClone(obj[key])
    } else {
      newObj[key] = obj[key]
    }
    // }
  }
  return newObj
}
export default{
  deepClone
}
