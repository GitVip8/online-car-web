<template>
  <div>
    <div class="condition-container">
      <el-form :inline="true" v-model="condition" label-width="120px">
        <el-form-item label="车牌号">
          <el-input size="small" v-model="condition.vehicleNo" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select size="small" filterable v-model="condition.company.companyId" :clearable="true">
            <el-option v-for="c in companys" :key="c.name" :label="c.label" :value="c.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所有人">
          <el-input size="small" v-model="condition.ownerName" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="find">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table size="small" :data="tableData" stripe style="width: 100%" @sort-change="handleSortChange">
      <el-table-column
        v-for="(column,index) in tableColumn"
        :key="index"
        :prop="column.name"
        :label="column.label"
        :width="column.width < 1?'':(column.width + 'px')"
        :sortable="column.sortable"
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
    <div class="page-container">
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
    <el-dialog top="10vh"
               title="车辆详情"
               :visible.sync="dialogVisible"
               width="80%">
      <div class="dialog-content" v-if="selected">
        <el-tabs type="card" v-if="selected" value="first">
          <el-tab-pane label="基本信息" name="first">
            <info-table :items="infoTableItems" :cols="2"></info-table>
          </el-tab-pane>
          <el-tab-pane label="保险信息" name="second" :disabled="!selected.insurance">
            <info-table :items="insuranceTableItems" :cols="1" ></info-table>
          </el-tab-pane>
          <el-tab-pane label="里程信息" name="third" :disabled="!selected.totalMile">
            <info-table :items="totalMileTableItem" :cols="1"></info-table>
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
import { findCompany } from '@/api/pub.js'
import { parseAddress } from '@/util/dic.js'
export default {
  name: 'BaseDriver',
  components: {
    InfoTable
  },
  watch: {
    selected (a, b) {
      if (!a) return
      this.infoTableItems = [
        {
          name: '车辆基本信息',
          properties: [
            {
              key: '平台名称',
              value: this.selected.company.companyName
            },
            {
              key: '省份',
              value: this.selected.address ? this.selected.address.split(' ')[0] : ''
            },
            {
              key: '城市',
              value: this.selected.address ? this.selected.address.split(' ')[1] : ''
            },
            {
              key: '车身颜色',
              value: this.selected.plateColor
            },
            {
              key: '车牌号码',
              value: this.selected.vehicleNo
            },
            {
              key: '车牌颜色',
              value: this.selected.vehicleColor
            },
            {
              key: '车辆厂牌',
              value: this.selected.brand
            },
            {
              key: '车辆型号',
              value: this.selected.model
            },
            {
              key: '核定载客位',
              value: this.selected.seats
            },
            {
              key: '车辆类型',
              value: this.selected.vehicleType
            },
            {
              key: '发动机型号',
              value: this.selected.engineId
            },
            {
              key: '车辆VIN码',
              value: this.selected.vin
            },
            {
              key: '车辆燃料类型',
              value: this.selected.fuelType
            },
            {
              key: '发动机排量',
              value: this.selected.engineDisplace
            }
          ]
        },
        {
          name: '车辆登记信息',
          properties: [
            {
              key: '车辆所有人',
              value: this.selected.ownerName
            },
            {
              key: '车辆经营区域',
              value: this.selected.transArea
            },
            {
              key: '车辆注册日期',
              value: this.selected.certifyDateA
            },
            {
              key: '车辆初次登记日期',
              value: this.selected.certifyDateB
            },
            {
              key: '车辆检修状态',
              value: this.selected.fixState
            },
            {
              key: '车辆下次年检时间',
              value: this.selected.nextFixDate
            },
            {
              key: '年审不合格',
              value: this.selected.checkState
            },
            {
              key: '报备日期',
              value: this.selected.registerDate
            },
            {
              key: '服务类型',
              value: this.selected.commercialType
            },
            {
              key: '运价类型',
              value: this.selected.fareType
            }
          ]
        },
        {
          name: '网络预约出租汽车运输证信息',
          properties: [
            {
              key: '运输证字号',
              value: this.selected.certificate
            },
            {
              key: '车辆运输证发证机构',
              value: this.selected.transAgency
            },
            {
              key: '车辆运输证有效期起',
              value: this.selected.transDateStart
            },
            {
              key: '车辆运输证有效期止',
              value: this.selected.transDateStop
            }
          ]
        },
        {
          name: '网络预约出租卫星设备信息',
          properties: [
            {
              key: '发票打印设备序列号',
              value: this.selected.feePrintId
            },
            {
              key: '卫星定位装置品牌',
              value: this.selected.gpsbrand
            },
            {
              key: '卫星定位装置型号',
              value: this.selected.gpsmodel
            },
            {
              key: '卫星定位装置IMEI号',
              value: this.selected.gpsimei
            },
            {
              key: '卫星定位设备安装日期',
              value: this.selected.gpsinstallDate
            }
          ]
        },
        {
          name: '车辆照片',
          properties: [
            {
              key: '车辆照片',
              value: this.selected.photoId
            }
          ]
        }
      ]
      this.insuranceTableItems = !this.selected.insurance ? [] : [
        {
          name: '车辆保险信息',
          properties: [
            {
              key: '保险公司名称',
              value: this.selected.insurance.insurCom
            },
            {
              key: '保险号',
              value: this.selected.insurance.insurNum
            },
            {
              key: '保险类型',
              value: this.selected.insurance.insurType
            },
            {
              key: '保险金额',
              value: this.selected.insurance.insurCount
            },
            {
              key: '保险生效时间',
              value: this.selected.insurance.insurEff
            },
            {
              key: '保险到期时间',
              value: this.selected.insurance.insurExp
            }
          ]
        }
      ]
      this.totalMileTableItem = !this.selected.insurance ? [] : [
        {
          name: '车辆里程信息',
          properties: [
            {
              key: '行驶总里程',
              value: this.selected.totalMile.totalMile
            }
          ]
        }
      ]
    }
  },
  data () {
    return {
      selected: null, // 当前选择车辆
      infoTableItems: [], // 车辆基本信息
      insuranceTableItem: {}, // 车辆保险信息
      totalMileTableItem: {}, // 车辆里程信息
      dialogVisible: false, // dialog是否可见
      // 查询列表显示字段
      tableColumn: [
        {
          name: 'company.companyName',
          label: '所属公司',
          sortable: true,
          width: 0
        },
        {
          name: 'address',
          label: '所在城市',
          width: 0
        },
        {
          name: 'vehicleNo',
          label: '车牌号',
          width: 0
        },
        {
          name: 'ownerName',
          label: '所有人',
          width: 0
        },
        {
          name: 'brand',
          label: '车辆厂牌',
          width: 0
        },
        {
          name: 'model',
          label: '车辆型号',
          width: 0
        },
        {
          name: 'vehicleType',
          label: '车辆类型',
          width: 0
        },
        {
          name: 'seats',
          label: '核定载客位',
          width: 0
        },
        {
          name: 'vehicleColor',
          label: '车身颜色',
          width: 0
        }
      ],
      // table 的数据
      tableData: [],
      // 查询条件
      condition: {
        vehicleNo: null,
        company: {
          companyId: null
        },
        ownerName: null
      },
      // 分页信息
      page: {
        page: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      },
      // 排序信息
      companys: []
    }
  },
  methods: {
    findCompanyDic () {
      findCompany().then(res => {
        this.companys = []
        let cs = res.data.data
        cs.forEach(a => this.companys.push({ code: a[0], label: a[1] }))
      })
    },
    // 查询所有
    find () {
      console.info('page', this.page.page)
      this.$axios.post('/car/basic/car-info/list', {page: this.page, condition: this.condition}).then((r) => {
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
        } else {
          this.$message.error(r.date.msg)
        }
      })
    },
    handleDetail: function (i, row) {
      // 查询其他信息（里程、保险）
      this.$axios.get('/car/basic/car-info/' + row.vehicleNo).then((r) => {
        if (r.data.code === 0) {
          row.insurance = r.data.data.insurance
          row.totalMile = r.data.data.totalMile
          this.selected = row
        } else {
          this.$message.error(r.date.msg)
        }
      })
      this.dialogVisible = true
    },
    handleSizeChange (a) {
      this.page.size = a
      this.find()
    },
    handleCurrentChange (b) {
      this.page.page = b
      this.find()
    },
    handleSortChange (column, prop, order) {
      this.page.sort = {
        order: column.order,
        prop: column.prop
      }
    }
  },
  created () {
    this.find()
    this.findCompanyDic()
  }
}
</script>

<style>
.page-container{
  margin-top: 15px;
  width: 100%;
  text-align: right;
}
</style>
