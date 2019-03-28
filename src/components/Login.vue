<template>
  <div class="main">
    <h2>{{app}}</h2>
    <div class='login-form'>
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" size="small" :clearable="true" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" size="small" type="password" :clearable="true"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" @click='handelLogin' :validate-event="true" :loading='logining'>登 录</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      app: state => state.app
    }),
    ...mapActions(['login'])
  },
  methods: {
    handelLogin () {
      const cb = res => {
        this.logining = false
        if (res.status === 200) {
          sessionStorage.setItem('access_token', res.data.access_token)
          sessionStorage.setItem('refresh_token', res.data.refresh_token)
          this.$router.push('/')
        }
      }
      this.logining = true
      this.$store.dispatch({
        type: 'login',
        payload: {
          user: this.form,
          callback: cb
        }
      })
    }
  }
}
</script>
<style>
h2{
  margin: 0;
  padding: 40px;
}
.main{
  background-image: url("~@/assets/login.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.login-form{
  width: 20%;
  min-width: 300px;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 30px 40px;
  background-color: #ffffffbd;
  border-radius: 4px;
  text-align: center;

}
</style>
