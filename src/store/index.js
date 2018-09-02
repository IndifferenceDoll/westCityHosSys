import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// 例：import fileSelect from './modules/fileSelect'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
/* eslint-disable no-new */
export default new Vuex.Store({
  actions,
  modules: {
    // 例 fileSelect
  },
  strict: debug
})
// 页面之间传递参数时，短的情况下直接挂在url后面，太长的话可能导致页面加载失败，所以需要通过以下方式：
// 1.通过缓存，即storage传递，但是存在问题是：当参数为变化或者需要实时响应的情况不适用（缓存的数据存在设备的文件中，页面刷新不会丢失）
// 2.通过vuex，但是存在致命问题，页面刷新时，vuex的状态数据会被清空、丢失（因为vuex的数据状态存在内存中，刷新时内存重置）
// 3.vuex + storage，解决所有问题，但是繁琐
// ps：以上方法根据场景不同，酌情使用
