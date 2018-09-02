/* eslint-disable no-useless-constructor */
import api from './interApi'
import utils from 'utils'

class OldApi {
  constructor () {

  }

  sendGet (url, params = {}) {
    let sendData = '?params=' + utils.base64Encode(params)
    return api.get(url + sendData)
  }

  sendPost (url, params = {}) {
    let sendData = 'params=' + utils.base64Encode(params)
    return api.post(url, sendData)
  }

  sendMultipart (url, param) { // 传入的params必须是一个formdata对象，并且其中的字段参数要在传入之前转化为base64
    return api.post(url, param)
  }
}

export default OldApi
