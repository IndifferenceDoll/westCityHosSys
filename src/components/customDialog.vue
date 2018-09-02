<template>
  <div v-if="isDialogOpen" class="container" @click.self.stop.prevent="preventAny">
    <div class="dialog">
      <slot name="before"></slot>
      <instance :dialogParams="dialogParams"></instance>
      <slot name="after"></slot>
    </div>
    <div class="close" @click="close">X</div>
  </div>
</template>

<script>
// 弹框使用说明：
// <custom-dialog :isDialogOpen="isDialogOpen" @close="close" :component="protrol" :dialogParams="{isFatherData:true}">
// 这里是内容区
// </custom-dialog>
// 内容区可以放原生dom，也可以放自定义组件,也可以同时放

// 内容区放原生dom例子：
// <custom-dialog :isDialogOpen="isDialogOpen" @close="close">
// 这里是内容区
// </custom-dialog>
// 放原生dom时，不要添加component和dialogParams属性，按照常规直接写就好

// 内容区放自定义组件例子
// <custom-dialog :isDialogOpen="isDialogOpen" @close="close" :component=":protrol" :dialogParams="{isFatherData:true}"></custom-dialog>
// 放自定义组件时，component必须写，protrol是组件对象（可变，根据实际定义的写），来自父组件的import，并添加在父组件的
// data中，例子：
// import protrol from './protrol'
// export default {
//   data () {
//     return {
//       protrol,
// 而dialogParams属性根据实际情况决定是否添加，如果自定义组件不需要接受父组件传参，则可以不写
// 传入的参数在自定义组件里使用：
// export default {
//   props: {
//     dialogParams: {
//       type: Object,
//       default: null
//     }
//   },
// dialogParams为固定属性名，那么所有的传入属性都会存在于dialogParams中，使用例子：
// <template>
//   <div class="protrol" v-if="dialogParams.isFatherData"

// 由于经过一层封装传递，所以传入自定义子组件中无法使用 this.$emit来广播，不过可以使用eventHub.$emit或者vuex来代替

// 两个具名插槽（slot）根据实际情况决定是否使用，或者使用哪一个,使用例子：
// <custom-dialog :isDialogOpen="isDialogOpen" @close="close" :component="protrol" :dialogParams="{isFatherData:true}">
//   <div slot="before">adfadfadfasdfasdf</div>
//   <div slot="after">adfadfadfasdfasdf</div>
// </custom-dialog>

// ps:有一处不完善的地方，是Vue.component('instance', this.component)，实例化组件也就是注册组件的时候采用了全局注册，有待优化，备用方案为使用vue.extends来注册，待尝试

import Vue from 'vue'
export default {
  props: {
    isDialogOpen: Boolean, // 控制弹框是否显隐
    component: {// 弹框组件中放置的自定义原始组件对象，不传为空
      type: Object,
      default: null
    },
    dialogParams: {// 父组件要传给传入的自定义原始组件对象的参数（最终传给实例化后的自定义组件的props），不传为空对象
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  beforeCreate () {
  },
  computed: {

  },
  methods: {
    preventAny (event) { // 阻止容器里点透效果
      return false
    },
    close () { // 关闭按钮
      this.$emit('close')
    }
  },
  created () {
    if (this.component) { // 判断是否出入组件原始对象
      Vue.component('instance', this.component)// 如果传入，就实例化，并起名为instance
    }
  },
  mounted () {
    var app = document.getElementById('app')// 获取项目最高级dom元素
    var container = document.getElementsByClassName('container')[0]// 获取dialog最高级元素
    app.appendChild(container || document.createElement('span'))// 将整个dialog移动到app里
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  top: 0;
  left:0;
  z-index: 999999;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  padding: 20px 10px;
  box-sizing: border-box;
}
.dialog{
 width: 100%;
 min-height: 300px;
 max-height: 70%;
 background: white;
 border-radius: 10px;
 margin-top: 80px;
 overflow: hidden;
 overflow-y: auto;
}
.close{
  margin: 0 auto;
  width: 40px;
  height: 40px;
  background: #aaa;
  border-radius: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
  margin-top: 10px;
}
</style>
