<template>
  <div class='bread'>
     <span class="exchange" @click='changeMenu'>
      <i class="fa fa-bars"></i>
    </span>
    <el-breadcrumb separator="/" class='el-bread' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-if="$route.path !== '/'">
        <el-breadcrumb-item v-for='(item,index) in $route.matched' :key='index'>{{item.name}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  data () {
    return {
      strong: ''
    }
  },
  methods: {
    getPageText (name) {
      return name.replace('编辑', this.$route.query.id ? '修改' : '添加')
    },
    changeMenu () {
      this.$store.dispatch('doCollapse')
    }
  },
  mounted () {
  },
  created () {
    console.info(this.$route)
    if (this.$route.matched.length) {
    /*
      var name = this.$route.matched[this.$route.matched.length - 1].name
      this.strong = this.getPageText(name)
      */
    }
  },
  watch: {
    $route (to, from) {
    /*
      this.strong = this.getPageText(to.name)
    */
    }
  }
}
</script>

<style scoped lang='less'>
  .bread {
    background: #fff;
    line-height: 26px;
    overflow: hidden;
    .el-bread {
      display: block;
      text-align: right;
      line-height: 26px;
      margin-left: 15px;
      float: left;
    }
  }
  .exchange{
  float: left;
  line-height: 26px;
  font-size: 26px;
  cursor: pointer;
  color: #666
}
</style>
