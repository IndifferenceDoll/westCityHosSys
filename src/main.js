/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VConsole from 'vconsole'
import Vuex from 'vuex'
import store from './store'
import FastClick from 'fastclick'
import { WechatPlugin } from 'vux'
import filters from 'filters'
import directives from 'directives'
import components from 'components'
import 'components/icon/iconfont'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

var vConsole = new VConsole({// 调试控制台实例化及配置
  defaultPlugins: ['system', 'network', 'element', 'storage'],
  onReady () {},
  onClearLog () {},
  toJSON () {},
  maxLogNumber: 100
})

Vue.use(Vuex)// 注册vuex
FastClick.attach(document.body) // 移除移动端点击延迟
Vue.use(WechatPlugin) // this.$wechat 访问到 wx 对象0
NProgress.configure({ showSpinner: false })// 等待请求结束的进度条
Object.keys(components).forEach(key => Vue.component(key, components[key]))// 全局注册组件（已有：全局弹框、iconfont）
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))// 全局注册过滤器（已有：性别）
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))// 全局注册指令（已有：拖拽）

new Vue({// 实例化项目根组件及配置
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
