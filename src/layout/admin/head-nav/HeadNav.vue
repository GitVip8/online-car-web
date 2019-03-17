<template>
  <div class="header">
    <span class='logo'><img src='@/assets/logo.png'><span>{{app}}</span></span>
    <span class="user">
      <el-dropdown trigger="hover" @command="handleCommand">
      <span class="el-dropdown-link">
        您好，{{user?user.principal.name:'游客'}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='logout'>登出</el-dropdown-item>
        <el-dropdown-item command='change-password'>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </span>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'HeadNav',
  data () {
    return {
      user: this.$store.state.user
    }
  },
  computed: {
    ...mapState({
      app: state => state.app
    })
  },
  created () {
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('logout')
          break
        case 'change-password':
          this.$message(command)
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
.el-header{
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding: 0;
}
.el-dropdown-link{
  cursor: pointer;
}
.header{
  overflow: hidden;
  padding: 0 15px;
}
.user{
  float: right;
  line-height: 60px;
}

.logo{
  padding: 0 7px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  height: 59px;
  overflow: hidden;
}
.logo img{
  margin-top: 5px;
  height: 50px;
  float: left
}
.logo span{
  float: left;
  margin-left: 15px;
  font-size: 20px;
}
.el-dropdown-menu__item{
  font-size: 13px;
}
</style>
