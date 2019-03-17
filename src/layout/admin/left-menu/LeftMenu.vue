<template>
  <div class='left-menu'>
    <el-scrollbar class="scrollbar">
      <el-menu :default-active="$router.history.current.path"  background-color="#fff" text-color="#444" active-text-color="rgb(98, 232, 0)" :collapse="collapse" :collapse-transition='true' :router="true">
        <template v-for="(val,index) in menu">
          <menu-parent v-if="val.children && val.children.length > 0" :key="index" :p="val.path+''" :item=val>
          </menu-parent>
          <el-menu-item v-else-if="!val.hide" :key="index" :index="val.path">
            <i :class="val.icon"></i>
            <span slot="title">{{val.name}}</span>
          </el-menu-item >
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import MenuParent from './MenuParent.vue'
import {mapState} from 'vuex'
export default {
  name: 'LeftMenu',
  computed: {
    ...mapState({
      collapse: state => state.menu.collapse
    })
  },
  components: {
    MenuParent
  },
  data () {
    return {
      menu: []
    }
  },
  created () {
    this.findMenu()
  },
  methods: {
    findMenu () {
      this.menu = this.$router.options.routes
    }
  }
}
</script>
<style>
.left-menu{
  height: calc(100vh - 60px);
  text-align:left;
  overflow: hidden;
  background: #fff;
  border-right: 1px solid #ccc;
}

.el-menu--collapse > span>.el-menu-item span, .el-menu--collapse> span>.el-submenu>.el-submenu__title span{
  height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
.el-menu{
  border: none;
}
.el-submenu .el-menu-item{
  font-size: 13px;
}
.el-submenu .el-submenu__title{
  font-size: 13px
}
.left-menu .el-scrollbar__wrap,.el-main > .el-scrollbar > .el-scrollbar__wrap {
  overflow-x: hidden;
}
.scrollbar{
  height: 100%
}
.left-menu .fa{
  margin-left:-5px;
  margin-right: 5px;
}
</style>
