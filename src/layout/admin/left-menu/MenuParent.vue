<template>
  <el-submenu :index="p">
    <template slot="title">
      <i :class="item.icon"></i>
      <span>{{item.name}}</span>
    </template>
    <template v-for="(val,index) in item.children">
      <menu-parent v-if="val.children && val.children.length > 0" :key="index" :p="p + val.path" :item=val>
      </menu-parent>
      <el-menu-item v-else :key="index" :index="val.path">
        <i :class="val.icon"></i>
        <span slot="title">{{val.name}}</span>
      </el-menu-item >
    </template>
  </el-submenu>
</template>
<script>
export default {
  name: 'MenuParent',
  props: {
    item: Object,
    p: String
  }
}
</script>
