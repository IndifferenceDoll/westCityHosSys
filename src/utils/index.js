import _ from 'lodash'
import { deepClone } from './deepClone'
import storage from 'utils/storage'
import eventHub from './eventHub'
import { getDate, getDatetime } from './date'

export function isWechat () { // 判断是否为wechat浏览器
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    return true
  }
  return false
}

export function getMobileType () { // 获取手机操作系统
  var ua = window.navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios'
  } else if (/android|adr|linux/.test(ua)) {
    return 'android'
  }
  return 'unknown'
}

export function prop2str (obj) { // 递归将对象中的属性值转为字符串
  let newObj = {...obj}
  for (var p in newObj) {
    if (_.isNumber(newObj[p])) {
      newObj[p] += ''
    } else if (_.isUndefined(newObj[p])) {
      newObj[p] = null
    } else if (_.isObject(newObj[p])) {
      prop2str(newObj[p])
    }
  }
  return newObj
}

export function base64Encode (data = {}, isObj) { // 转为base64
  var dataStr = prop2str(data)
  var json = JSON.stringify(dataStr)
  var params = btoa(unescape(encodeURIComponent(json)))
  return isObj ? { params } : params
}

export function getWeChatOpenid () {
  // return 'oNjjd07fuuKXxFKlkxuihtsdNL_0'
  // return 'oNjjd0-wnPybslsuM3ioP9MLNs0I' // 这个是未绑定手机号的 openid
  let href = window.location.href// 获取可能含有openid的地址
  let position = href.indexOf('openid=')// 获取openid=在字符串中的位置
  if (position > -1) { // 含有openid=
    let openidStr = href.split('openid=')[1]// 截取openid=后面的字符串openidStr
    let openid = openidStr.substring(0, 28)// 截取openid
    storage.setItem('wxopid', openid)// 将openid存入缓存
    return openid// 并返回openid给调用此方法处
  } else { // 若链接中没有openid=
    return storage.getItem('wxopid')// 则存缓存中取出openid，并返回给该方法调用处
  }
}

export function getNowFormatDate () { // 获取当前日期
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + '' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}

export function escape2Html (str) { // 将字符串中的编码转换为符号
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
}
export default {
  isWechat,
  getMobileType,
  prop2str,
  base64Encode,
  getNowFormatDate,
  escape2Html,
  deepClone,
  storage,
  eventHub,
  getDate,
  getDatetime
}
