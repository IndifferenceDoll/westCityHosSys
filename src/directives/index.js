const movable = {
  inserted (el, binding) {
    el.firstChild.onmousedown = function (e) {
      e.stopPropagation()
      var oHeight = e.offsetY// 相对于父元素的y坐标
      var oWidth = e.offsetX// 相对于父元素的x坐标
      el.parentNode.onmousemove = function (ev) {
        e.stopPropagation()
        var xNew = ev.clientX
        var yNew = ev.clientY
        console.log(el.parentNode.offsetLeft)
        el.style.left = xNew - oWidth - el.parentNode.offsetLeft + 'px'// offsetLeft某元素自己的左偏移值
        el.style.top = yNew - oHeight - el.parentNode.offsetTop + 'px'
      }
      el.firstChild.onmouseup = function () {
        el.parentNode.onmousemove = null
      }
    }
  }
}

export default {
  movable
}
