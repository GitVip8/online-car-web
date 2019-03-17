<template>
  <div>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'blankLayout',
    data () {
      return {}
    },
    methods: {},
    created () {
    },
    mounted () {
    }
  }
</script>
<style scoped lang='less'>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

