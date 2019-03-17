<template>
  <div>
    <table class="info-table" v-for="(item,index0) in items" :key="index0">
      <tr><td :colspan="2*cols">{{item.name}}</td></tr>
      <tr v-for="a in (item.properties.length%cols==0?item.properties.length/cols:(parseInt(item.properties.length/cols) + 1))" :key="a">
        <template  v-for="b in cols">
          <template v-if="item.properties[(a-1)*cols  (b-1)]">
            <td :key="a+b">{{(item.properties[(a-1)*cols  (b-1)]?item.properties[(a-1)*cols  (b-1)].key:"")}}</td>
            <td :key="a+b + 1">{{item.properties[(a-1)*cols  (b-1)]?item.properties[(a-1)*cols  (b-1)].value:""}}</td>
          </template>
          <template v-else>
            <td :key="a+b + 2"></td><td :key="a+b + 3"></td>
          </template>
        </template>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'InfoTable',
  props: {
    cols: {
      type: Number,
      required: false,
      default: 1
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
.info-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    table-layout: fixed;
}

.info-table tr td {
    border: 1px solid #ccc;
    padding: 10px 15px;
}

.info-table tr td:nth-child(2n+1) {
    max-width: 150px;
    background: #f9f9f9;
}
</style>
