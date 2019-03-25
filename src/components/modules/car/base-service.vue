<template>
  <div>
    <div class="condition-container">
      <el-form :inline="true" v-model="condition" label-width="120px">
        <el-form-item label="平台标识">
          <el-input size="small" v-model="condition.companyId" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="地区">
            <el-cascader :props="xzqhProps" size="small" v-model="condition.address"
              :options="xzqhList"
              filterable>
            </el-cascader>
        </el-form-item>
        <el-form-item label="法人">
          <el-input size="small" v-model="condition.legalName" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="default" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="find">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table size="small" :data="tableData" stripe style="width: 100%">
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
        :current-page="page.page"
        :page-sizes="[10, 20,30, 50]"
        :page-size="page.size"
        :page-count="page.totalPages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalElements"
      ></el-pagination>
    </div>
    <el-dialog top="10vh" title="服务机构信息详情" :visible.sync="dialogVisible" width="80%">
      <div class="dialog-content" v-if="selected">
        <el-tabs type="card" v-if="selected" value="A" @tab-click="handleTabSwitch">
          <el-tab-pane label="基本信息" name="A">
            <info-table :cols="2" :items="serviceInfo.base"></info-table>
          </el-tab-pane>
          <el-tab-pane label="运营规模信息" name="B" :disabled="!serviceInfo.stat">
            <info-table :cols="2" :items="serviceInfo.stat"></info-table>
          </el-tab-pane>
          <el-tab-pane label="支付信息" name="C">
            <el-table size="small" :data="pay.tableData" stripe style="width: 100%">
              <el-table-column
                v-for="(column,index) in pay.tableColumn"
                :key="index"
                :prop="column.name"
                :label="column.label"
                :width="column.width < 1?'':(column.width + 'px')">
              </el-table-column>
            </el-table>
            <div class="page-container" v-if="page">
              <el-pagination
                background
                @size-change="payPageSizeChange"
                @current-change="payPageCurrentChange"
                :current-page="pay.page.page"
                :page-sizes="[10, 20,30, 50]"
                :page-size="pay.page.size"
                :page-count="pay.page.totalPages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pay.page.totalElements"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务机构" name="D" :disabled="!serviceInfo.service">
            <info-table :cols="2" :items="serviceInfo.service"></info-table>
          </el-tab-pane>
          <el-tab-pane label="经营许可" name="E" :disabled="!serviceInfo.permit">
            <info-table :cols="2" :items="serviceInfo.permit"></info-table>
          </el-tab-pane>
          <el-tab-pane label="运价信息" name="F">
            <el-table size="small" :data="fare.tableData" stripe style="width: 100%">
              <el-table-column
                v-for="(column,index) in fare.tableColumn"
                :key="index"
                :prop="column.name"
                :label="column.label"
                :width="column.width < 1?'':(column.width + 'px')">
              </el-table-column>
            </el-table>
            <div class="page-container" v-if="page">
              <el-pagination
                background
                @size-change="farePageSizeChange"
                @current-change="farePageCurrentChange"
                :current-page="fare.page.page"
                :page-sizes="[10, 20,30, 50]"
                :page-size="fare.page.size"
                :page-count="fare.page.totalPages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="fare.page.totalElements"
              >
              </el-pagination>
            </div>
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
import { XZQH, parseAddress } from '@/util/dic.js'
export default {
  name: 'BaseService',

  components: {
    InfoTable
  },
  created () {
    if (XZQH) this.xzqh = XZQH
    this.find()
  },
  watch: {
    xzqh (a) {
      this.xzqhList = a
    },
    selected (a, b) {
      if (!a) return
      /*
        base: null,
        stat: null,
        pay: null,
        service: null,
        permit: null,
        fare: null
      */
      this.serviceInfo = {
        base: [
          {
            name: '基本信息',
            properties: [
              {
                key: '平台名称',
                value: this.selected.companyName
              },
              {
                key: '省份',
                value: this.selected.address
              },
              {
                key: '城市',
                value: this.selected.address
              },
              {
                key: '统一社会信用代码',
                value: this.selected.identifier
              },
              {
                key: '经营范围',
                value: this.selected.businessScope
              },
              {
                key: '经济类型',
                value: this.selected.economicType
              },
              {
                key: '注册资本',
                value: this.selected.regCapital
              },
              {
                key: '法人代表姓名',
                value: this.selected.legalName
              },
              {
                key: '法人代表身份证号',
                value: this.selected.legalId
              },
              {
                key: '法人代表电话',
                value: this.selected.legalPhone
              },
              {
                key: '通讯地址',
                value: this.selected.contactAddress
              }
            ]
          },
          {
            name: '法人代表身份证',
            properties: [
              {
                key: '法人代表身份证扫描件',
                value: this.selected.legalPhoto
              }
            ]
          }
        ],
        stat: !this.selected.stat ? [] : [
          {
            name: '运营规模信息',
            properties: [
              {
                key: '平台名称',
                value: this.selected.company
              },
              {
                key: '平台注册网约车辆数',
                value: this.selected.stat.vehicleNum
              },
              {
                key: '平台注册驾驶员数',
                value: this.selected.stat.driverNum
              }
            ]
          }
        ],
        service: !this.selected.service ? [] : [
          {
            name: '服务机构信息',
            properties: [
              {
                key: '平台名称',
                value: this.selected.companyName
              },
              {
                key: '服务机构名称',
                value: this.selected.service.serviceName
              },
              {
                key: '省份',
                value: this.selected.service.address
              },
              {
                key: '城市',
                value: this.selected.service.address
              },
              {
                key: '服务机构代码',
                value: this.selected.service.serviceNo
              },
              {
                key: '服务机构地址',
                value: this.selected.service.detailAddress
              },
              {
                key: '服务机构负责人姓名',
                value: this.selected.service.responsibleName
              },
              {
                key: '负责人联系电话',
                value: this.selected.service.responsiblePhone
              },
              {
                key: '服务机构管理人姓名',
                value: this.selected.service.managerName
              },
              {
                key: '管理人联系电话',
                value: this.selected.service.managerPhone
              },
              {
                key: '服务机构紧急联系电话',
                value: this.selected.service.contactPhone
              },
              {
                key: '服务机构设立日期',
                value: this.selected.service.createDate
              },
              {
                key: '行政文书送达邮寄地址',
                value: this.selected.service.mailAddress
              }
            ]
          }
        ],
        permit: !this.selected.permit ? [] : [
          {
            name: '经营许可信息',
            properties: [
              {
                key: '平台名称',
                value: this.selected.companyName
              },
              {
                key: '经济性质',
                value: this.selected.economicType
              },
              {
                key: '行政区划',
                value: this.selected.permit.address
              },
              {
                key: '核发机关',
                value: this.selected.permit.organization
              },
              {
                key: '业户名称',
                value: this.selected.permit.ownerName
              },
              {
                key: '经营范围',
                value: this.selected.businessScope
              },
              {
                key: '证照状态',
                value: this.selected.permit.state
              },
              {
                key: '证件有效期起',
                value: this.selected.permit.startDate
              },
              {
                key: '证件有效期止',
                value: this.selected.permit.stopDate
              },
              {
                key: '统一社会信用编码',
                value: this.selected.identifier
              },
              {
                key: '经营区域',
                value: this.selected.permit.operationArea
              },
              {
                key: '初次发证日期',
                value: this.selected.permit.certifyDate
              },
              {
                key: '网络预约出租车经营许可证号',
                value: this.selected.permit.certificate
              }
            ]
          }
        ]
      }
      this.pay.tableData = []
      this.pay.page = {
        page: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      }
      this.fare.tableData = []
      this.fare.page = {
        page: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      }
    }
  },
  data () {
    return {
      xzqh: [],
      xzqhList: [],
      xzqhProps: {
        value: 'code',
        label: 'name',
        children: 'cityList'
      },
      selected: null,
      serviceInfo: {
        base: null,
        stat: null,
        pay: null,
        service: null,
        permit: null,
        fare: null
      },
      dialogVisible: false, // dialog是否可见
      // 查询列表显示字段
      tableColumn: [
        {
          name: 'companyId',
          label: '平台标识',
          width: 0
        },
        {
          name: 'companyName',
          label: '平台名称',
          width: 0
        },
        {
          name: 'address',
          label: '地区',
          width: 0
        },
        {
          name: 'legalName',
          label: '法人代表姓名',
          width: 0
        },
        {
          name: 'legalId',
          label: '法人代表身份证号',
          width: 0
        },
        {
          name: 'legalPhone',
          label: '法人代表电话号',
          width: 0
        }
      ],
      // table 的数据
      tableData: [],
      // 查询条件
      condition: {
        companyId: null,
        legalName: null,
        address: null
      },
      // 分页信息
      page: {
        page: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      },
      pay: {
        tableData: [],
        tableColumn: [
          {
            name: 'payName',
            label: '银行或者非银行支付机构名称',
            width: 0
          },
          {
            name: 'payId',
            label: '非银行支付机构支付业务许可证编号',
            width: 0
          },
          {
            name: 'payType',
            label: '支付业务类型',
            width: 0
          },
          {
            name: 'payScope',
            label: '业务覆盖范围',
            width: 0
          },
          {
            name: 'prepareBank',
            label: '备付金存管银行',
            width: 0
          },
          {
            name: 'countDate',
            label: '结算周期',
            width: 0
          }
        ],
        page: {
          page: 1,
          size: 10,
          totalPages: 1,
          totalElements: 0,
          sort: {}
        }
      },
      fare: {
        tableData: [],
        tableColumn: [
          {
            name: 'fareType',
            label: '运价类型编码',
            width: 0
          },
          {
            name: 'fareTypeNote',
            label: '运价类型说明',
            width: 0
          },
          {
            name: 'fareValidOn',
            label: '运价有效期起',
            width: 0
          },
          {
            name: 'fareValidOff',
            label: '运价有效期止',
            width: 0
          },
          {
            name: 'startFare',
            label: '起步价',
            width: 0
          },
          {
            name: 'startMile',
            label: '起步里程',
            width: 0
          },
          {
            name: 'unitPricePerMile',
            label: '计程单价',
            width: 0
          },
          {
            name: 'unitPricePerMinute',
            label: '计时单价',
            width: 0
          },
          {
            name: 'upPrice',
            label: '单程加价单价',
            width: 0
          },
          {
            name: 'upPriceStartMile',
            label: '单程加价公里',
            width: 0
          },
          {
            name: 'morningPeakTimeOn',
            label: '运营早高峰时间起',
            width: 0
          },
          {
            name: 'morningPeakTimeOff',
            label: '运营早高峰时间止',
            width: 0
          },
          {
            name: 'eveningPeakTimeOn',
            label: '运营晚高峰时间起',
            width: 0
          },
          {
            name: 'eveningPeakTimeOff',
            label: '运营晚高峰时间止',
            width: 0
          },
          {
            name: 'otherPeakTimeOn',
            label: '其他运营高峰时间起',
            width: 0
          },
          {
            name: 'otherPeakTimeOff',
            label: '其他运营高峰时间止',
            width: 0
          },
          {
            name: 'peakUnitPrice',
            label: '高峰时间单程加价单价',
            width: 0
          },
          {
            name: 'peakPriceStartMile',
            label: '高峰时间单程加价公里',
            width: 0
          },
          {
            name: 'lowSpeedPricePerMinute',
            label: '低速计时加价',
            width: 0
          },
          {
            name: 'nightPricePerMile',
            label: '夜间费公里',
            width: 0
          },
          {
            name: 'nightPricePerMinute',
            label: '夜间费分钟',
            width: 0
          },
          {
            name: 'otherPrice',
            label: '其它加价金额',
            width: 0
          }
        ],
        page: {
          page: 1,
          size: 10,
          totalPages: 1,
          totalElements: 0,
          sort: {}
        }
      }
    }
  },
  methods: {
    reset () {
      this.condition = {
        companyId: null,
        address: null,
        legalName: null
      }
    },
    // 查询所有
    find () {
      let c = Object.assign({}, this.condition)
      if (c.address) c.address = c.address[1]
      this.$axios.post('/car/basic/service-info/list', { page: this.page, condition: c })
        .then(r => {
          if (r.data.code === 0) {
            var d = r.data.data
            this.tableData = d.content.map(function (a) {
              a.address = parseAddress(a.address)
              return a
            })
            this.page = {
              totalPages: d.totalPages,
              totalElements: d.totalElements,
              page: (d.number + 1),
              size: d.size
            }
          } else this.$message.error(r.date.msg)
        })
    },
    handleDetail (i, row) {
      this.$axios.get(`/car/basic/service/${row.companyId}`).then(r => {
        if (r.data.code === 0) {
          let d = r.data.data
          if (d.permit) row.permit = d.permit
          if (d.stat) row.stat = r.data.data.stat
          if (d.service) row.service = r.data.data.service
          this.selected = row
        } else {
          this.$message.error(r.date.msg)
        }
      })
      this.dialogVisible = true
    },
    handelSortChange () {},
    handleSizeChange (a) {
      this.page.size = a
      this.find()
    },
    handleCurrentChange (b) {
      this.page.page = b
      this.find()
    },
    handleTabSwitch (a) {
      switch (a.name) {
        case 'C':
          if (this.pay.tableData && this.pay.tableData.length > 0) return
          this.findPay()
          break
        case 'F':
          if (this.fare.tableData && this.fare.tableData.length > 0) return
          this.findFare()
          break
        case 'A':
        case 'B':
        case 'D':
        case 'E':
        default:
          break
      }
    },
    findPay () {
      this.$axios
        .post(`/car/basic/service-pay/${this.selected.companyId}`, {page: this.pay.page, condition: null})
        .then(r => {
          if (r.data.code === 0) {
            var d = r.data.data
            this.pay.tableData = d.content.map(function (a) {
              /* a.courseDate = parseDate(a.courseDate)
              a.startTime = parseDate(a.startTime)
              a.stopTime = parseDate(a.stopTime)
              */
              return a
            })
            this.pay.page = {
              totalPages: d.totalPages,
              totalElements: d.totalElements,
              page: (d.number + 1),
              size: d.size
            }
          } else this.$message.error(r.date.msg)
        })
    },
    payPageSizeChange (a) {
      this.pay.page.size = a
      this.findPay()
    },
    payPageCurrentChange (b) {
      this.pay.page.page = b
      this.findPay()
    },
    findFare () {
      this.$axios
        .post(`/car/basic/service-fare/${this.selected.companyId}`, {page: this.fare.page, condition: null})
        .then(r => {
          if (r.data.code === 0) {
            var d = r.data.data
            this.fare.tableData = d.content.map(function (a) {
              /* a.courseDate = parseDate(a.courseDate)
              a.startTime = parseDate(a.startTime)
              a.stopTime = parseDate(a.stopTime)
              */
              return a
            })
            this.fare.page = {
              totalPages: d.totalPages,
              totalElements: d.totalElements,
              page: (d.number + 1),
              size: d.size
            }
          } else this.$message.error(r.date.msg)
        })
    },
    farePageSizeChange (a) {
      this.fare.page.size = a
      this.findFare()
    },
    farePageCurrentChange (b) {
      this.fare.page.page = b
      this.findFare()
    }
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
