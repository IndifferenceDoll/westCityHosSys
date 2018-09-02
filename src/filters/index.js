export function genderFilter (input = '') {
  const hash = {
    'M': '男',
    'F': '女',
    'O': '未知'
  }
  return hash[input] || ''
}

export default {
  genderFilter
}
