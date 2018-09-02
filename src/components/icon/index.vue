<template>
  <div class="myIcon">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="xlinkHref"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: String
  },
  computed: {
    xlinkHref () {
      return '#icon-' + this.name
    }
  },
  created () {
    // console.log(this.name)
  }
}
</script>

<style>
.myIcon {
  display: inline-block;
}
</style>
