<template>
  <div>
    <el-table size="small" :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(column,index) in tableColumn"
        :key="index"
        :prop="column.name"
        :label="column.label"
        :width="column.width < 1?'':(column.width + 'px')"
      ></el-table-column>
      <el-table-column width="60px" label="详情" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            circle
            type="primary"
            @click="handleDetail(scope.$index, scope.row)"
            title="详情"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container" v-if="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20,30, 50]"
        :page-size="page.size"
        :page-count="page.totalPages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalElements"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableList',
  porps: {
    tableData: {
      type: Array,
      required: true,
      default: []
    },
    tableColumn: {
      type: Array,
      required: true,
      default: []
    },
    page: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleDetail (i, row) {
      this.$emit('seeDetail', row)
    },
    handleSizeChange () {
      this.$emit('refresh')
    },
    handleCurrentChange () {
      this.$emit('refresh')
    }
  }
}
</script>
