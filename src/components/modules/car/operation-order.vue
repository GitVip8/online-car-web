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
        @size-change="find"
        @current-change="find"
        :current-page="page.currentPage"
        :page-sizes="[10, 20,30, 50]"
        :page-size="page.size"
        :page-count="page.totalPages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalElements"
      ></el-pagination>
    </div>
    <el-dialog top="10vh" title="订单信息详情" :visible.sync="dialogVisible" width="80%">
      <div class="dialog-content" v-if="selected">
        <el-tabs type="card" v-if="selected" value="A">
          <el-tab-pane label="订单发起信息" name="A">
            <info-table :cols="2" :items="orderInfo.create"></info-table>
          </el-tab-pane>
          <el-tab-pane label="订单成功信息" name="B" :disabled="!orderInfo.match">
            <info-table :cols="2" :items="orderInfo.match"></info-table>
          </el-tab-pane>
          <el-tab-pane label="经营出发信息" name="C" :disabled="!orderInfo.depart">
            <info-table :cols="2" :items="orderInfo.depart"></info-table>
          </el-tab-pane>
          <el-tab-pane label="经营到达信息" name="D" :disabled="!orderInfo.arrive">
            <info-table :cols="2" :items="orderInfo.arrive"></info-table>
          </el-tab-pane>
          <el-tab-pane label="经营支付信息" name="E" :disabled="!orderInfo.pay">
            <info-table :cols="2" :items="orderInfo.pay"></info-table>
          </el-tab-pane>
          <el-tab-pane label="订单撤销信息" name="F" :disabled="!orderInfo.cancel">
            <info-table :cols="2" :items="orderInfo.cancel"></info-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import InfoTable from './info-table.vue'
export default {
  name: 'OperationOrder',

  components: {
    InfoTable
  },
  created () {
    this.find()
  },
  watch: {
    selected: function (a, b) {
      if (!a) return
      this.orderInfo.create = [
        {
          name: '订单发起信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '乘客备注',
              value: this.selected.orderCreate.passengerNote
            },
            {
              key: '城市',
              value: this.selected.orderCreate.address
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '预计用车时间',
              value: this.selected.orderCreate.departTime
            },
            {
              key: '订单发起时间',
              value: this.selected.orderCreate.orderTime
            },
            {
              key: '运价类型编码',
              value: this.selected.orderCreate.fareType
            },
            {
              key: '预计出发地点详细地址',
              value: this.selected.orderCreate.departure
            },
            {
              key: '预计目的地',
              value: this.selected.orderCreate.destination
            }
          ]
        }
      ]

      this.orderInfo.match = !this.selected.orderMatch ? null : [
        {
          name: '订单成功信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '派单成功时间',
              value: this.selected.orderMatch.distributeTime
            },
            {
              key: '城市',
              value: this.selected.address
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '车辆号码',
              value: this.selected.orderMatch.vehicleNo
            },
            {
              key: '机动车驾驶证号',
              value: this.selected.orderMatch.licenseId
            },
            {
              key: '驾驶员手机号',
              value: this.selected.orderMatch.driverPhone
            }
          ]
        }
      ]
      this.orderInfo.depart = !this.selected.operaDepart ? null : [
        {
          name: '经营出发信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '机动车驾驶证号',
              value: this.selected.operaDepart.licenseId
            },
            {
              key: '车辆号码',
              value: this.selected.operaDepart.vehicleNo
            },
            {
              key: '运价类型编码',
              value: this.selected.operaDepart.fareType
            },
            {
              key: '上车时间',
              value: this.selected.operaDepart.depTime
            },
            {
              key: '空驶里程（公里）',
              value: this.selected.operaDepart.waitMile
            },
            {
              key: '等待时间',
              value: this.selected.operaDepart.waitTime
            }
          ]
        }
      ]
      this.orderInfo.arrive = !this.selected.operaArrive ? null : [
        {
          name: '经营到达信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '载客时间',
              value: this.selected.operaArrive.driveTime
            },
            {
              key: '载客里程（公里）',
              value: this.selected.operaArrive.driveMile
            },
            {
              key: '下车时间',
              value: this.selected.operaArrive.destTime
            }
          ]
        }
      ]
      this.orderInfo.pay = !this.selected.operaPay ? null : [
        {
          name: '经营支付信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '载客时间',
              value: this.selected.operaArrive.driveTime
            },
            {
              key: '载客里程（公里）',
              value: this.selected.operaArrive.driveMile
            },
            {
              key: '下车时间',
              value: this.selected.operaArrive.destTime
            }
          ]
        }
      ]
      this.orderInfo.cancel = !this.selected.orderCancel ? null : [
        {
          name: '订单撤销信息',
          properties: [
            {
              key: '公司名称',
              value: this.selected.companyName
            },
            {
              key: '上车地点行政区划代码',
              value: this.selected.orderCancel.address
            },
            {
              key: '订单编号',
              value: this.selected.orderId
            },
            {
              key: '订单时间',
              value: this.selected.orderCancel.orderTime
            },
            {
              key: '撤销发起方',
              value: this.selected.orderCancel.operator
            },
            {
              key: '撤销类型',
              value: this.selected.orderCancel.cancelTypeCode
            },
            {
              key: '撤销或违约原因',
              value: this.selected.orderCancel.cancelReason
            }
          ]
        }
      ]
    }
  },
  data () {
    return {
      selected: null,
      orderInfo: {
        create: null,
        match: null,
        cancel: null,
        arrive: null,
        depart: null,
        pay: null
      },
      dialogVisible: false, // dialog是否可见
      // 查询列表显示字段
      tableColumn: [
        {
          name: 'address',
          label: '地区',
          width: 0
        },
        {
          name: 'company.companyName',
          label: '平台名称',
          width: 0
        },
        {
          name: 'orderId',
          label: '订单号',
          width: 0
        },
        {
          name: 'order.orderTime',
          label: '订单发起时间',
          width: 0
        },
        {
          name: 'vehicleNo',
          label: '车辆号码',
          width: 0
        },
        {
          name: 'licenseld',
          label: '机动车驾驶证号',
          width: 0
        },
        {
          name: 'driverPhone',
          label: '驾驶员手机号',
          width: 0
        },
        {
          name: 'orderState',
          label: '订单状态',
          width: 0
        }
      ],
      // table 的数据
      tableData: [],
      // 查询条件
      condition: {
        test1: '',
        test2: ''
      },
      // 分页信息
      page: {
        currentPage: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      },
      // 排序信息
      sort: {}
    }
  },
  methods: {
    // 查询所有
    find () {
      this.$axios
        .get('/car/operation/order-info/list', { params: this.page })
        .then(r => {
          if (r.data.code === 0) {
            var d = r.data.data
            this.tableData = d
          } else this.$message.error(r.date.msg)
        })
    },
    handleDetail (i, row) {
      this.$axios.get(`/car/operation/order-info/${row.orderId}`).then(r => {
        if (r.data.code === 0) {
          this.selected = r.data.data
        } else {
          this.$message.error(r.date.msg)
        }
      })
      this.dialogVisible = true
    },
    handelSortChange () {}
  }
}
</script>
<style>
.page-container {
  margin-top: 15px;
  width: 100%;
  text-align: right;
}
</style>
