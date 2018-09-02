import extendsApi from '../extendsApi'

class Home extends extendsApi {
  constructor () {
    super()
    this.exampleGetUrl = ''
    this.examplePostUrl = ''
  }
  exampleGet (params) {
    return this.sendGet(this.exampleGetUrl, params).then(res => {
      return res.data
    })
  }
  examplePost (params) {
    return this.sendGet(this.examplePostUrl, params).then(res => {
      return res.data
    })
  }
}

export default new Home()
