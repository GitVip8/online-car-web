<template>
  <div class="home" v-loading.fullscreen.lock="loading">
    <el-container>
       <el-header>
          <HeaderNav></HeaderNav>
        </el-header>
      <el-container>
       <el-aside :style="'width: ' + leftWidth">
        <left-menu></left-menu>
      </el-aside>
        <el-main>
          <bread></bread>
          <el-scrollbar class="scrollbar">
            <div class='content'>
                <div>
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </div>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Bread from './bread/Bread.vue'
import LeftMenu from './left-menu/LeftMenu.vue'
import HeaderNav from './head-nav/HeadNav.vue'
import {mapState} from 'vuex'
export default {
  name: 'AdminLayout',
  computed: {
    ...mapState({
      leftWidth: state => state.menu.width,
      loading: state => state.loading.initLoading
    })
  },
  components: {
    Bread, LeftMenu, HeaderNav
  },
  created () {
  }
}
</script>
<style scoped lang='less'>
.el-main{
  padding: 0;
}
.el-main > .bread {
  padding: 12px 15px;
}
.el-main .scrollbar {
  height: calc(100vh - 111px);
}
.el-main .content {
  overflow: auto;
  padding: 15px 12px 12px 12px;
  background: #efefef;
}
.el-main .content > div:first-child {
  background: #fff;
  min-height: calc(100vh - 170px);
  padding: 15px
}
</style>
