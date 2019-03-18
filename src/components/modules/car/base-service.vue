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
    <el-dialog top="10vh" title="服务机构信息详情" :visible.sync="dialogVisible" width="80%">
      <div class="dialog-content" v-if="selected">
        <el-tabs type="card" v-if="selected" value="A">
          <el-tab-pane label="基本信息" name="A">
            <info-table :cols="2" :items="serviceInfo.base"></info-table>
          </el-tab-pane>
          <el-tab-pane label="运营规模信息" name="B" :disabled="!serviceInfo.stat">
            <info-table :cols="2" :items="serviceInfo.stat"></info-table>
          </el-tab-pane>
          <el-tab-pane label="支付信息" name="C" :disabled="!serviceInfo.pay">
            <info-table :cols="2" :items="serviceInfo.pay"></info-table>
          </el-tab-pane>
          <el-tab-pane label="服务机构" name="D" :disabled="!serviceInfo.service">
            <info-table :cols="2" :items="serviceInfo.service"></info-table>
          </el-tab-pane>
          <el-tab-pane label="经营许可" name="E" :disabled="!serviceInfo.permit">
            <info-table :cols="2" :items="serviceInfo.permit"></info-table>
          </el-tab-pane>
          <el-tab-pane label="运价信息" name="F" :disabled="!serviceInfo.fare">
            <info-table :cols="2" :items="serviceInfo.fare"></info-table>
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
  name: 'BaseService',

  components: {
    InfoTable
  },
  created () {
    this.find()
  },
  watch: {
    selected (a, b) {
      if (!a) return
      this.infoTableItems = [
        {
          name: '驾驶员基本信息',
          properties: [
            {
              key: '平台名称',
              value: this.selected.company
                ? this.selected.company.companyName
                : ''
            },
            {
              key: '省份',
              value: ''
            },
            {
              key: '城市',
              value: ''
            },
            {
              key: '机动车驾驶员姓名',
              value: this.selected.driverName
            },
            {
              key: '驾驶员手机号',
              value: this.selected.driverPhone
            },
            {
              key: '驾驶员性别',
              value: this.selected.driverGender
            },
            {
              key: '出生日期',
              value: this.selected.driverBirthday
            },
            {
              key: '国籍',
              value: this.selected.driverNationality
            },
            {
              key: '驾驶员民族',
              value: this.selected.driverNation
            },
            {
              key: '驾驶员婚姻状况',
              value: this.selected.driverMaritalStatus
            },
            {
              key: '驾驶员外语能力',
              value: this.selected.driverLanguageLevel
            },
            {
              key: '驾驶员学历',
              value: this.selected.driverEducation
            },
            {
              key: '户口登记机关名称',
              value: this.selected.driverCensus
            },
            {
              key: '户口地址或常住地址',
              value: this.selected.driverAddress
            },
            {
              key: '驾驶员通讯地址',
              value: this.selected.driverContactAddress
            },
            {
              key: '紧急情况联系人',
              value: this.selected.emergencyContact
            },
            {
              key: '紧急情况联系人电话',
              value: this.selected.emergencyContactPhone
            },
            {
              key: '紧急情况联系人通讯地址',
              value: this.selected.emergencyContactAddress
            }
          ]
        },
        {
          name: '机动车驾驶证信息',
          properties: [
            {
              key: '机动车驾驶证号',
              value: this.selected.licenseId
            },
            {
              key: '准驾车型',
              value: this.selected.driverType
            },
            {
              key: '初次领取驾驶证信息',
              value: this.selected.getDriverLicenseDate
            },
            {
              key: '驾驶证有效期起',
              value: this.selected.driverLicenseOn
            },
            {
              key: '驾驶证有效期止',
              value: this.selected.driverLicenseOff
            }
          ]
        },
        {
          name: '网络预约出租汽车驾驶证信息',
          properties: [
            {
              key: '网络预约出租汽车驾驶员资格证号',
              value: this.selected.certificateNo
            },
            {
              key: '网络预约出租汽车驾驶员证发证机构',
              value: this.selected.networkCarIssueOrganization
            },
            {
              key: '资格证发证日期',
              value: this.selected.networkCarIssueDate
            },
            {
              key: '初次领取资格证日期',
              value: this.selected.getNetworkCarProofDate
            },
            {
              key: '资格证有效起始日期',
              value: this.selected.networkCarProofOn
            },
            {
              key: '资格证有效截止日期',
              value: this.selected.networkCarProofOff
            },
            {
              key: '报备日期',
              value: this.selected.registerDate
            }
          ]
        },
        {
          name: '驾驶员服务信息',
          properties: [
            {
              key: '是否迅游出租汽车驾驶员',
              value: this.selected.taxiDriver
            },
            {
              key: '是否专职驾驶员',
              value: this.selected.fullTimeDriver
            },
            {
              key: '是否在驾驶员黑名单内',
              value: this.selected.inDriverBlacklist
            },
            {
              key: '服务类型',
              value: this.selected.commercialType
            },
            {
              key: '驾驶员合同(或协议)签署公司',
              value: this.selected.contractCompany
            },
            {
              key: '合同(或协议)有效期起',
              value: this.selected.contractOn
            },
            {
              key: '合同(或协议)有效期止',
              value: this.selected.contractOff
            }
          ]
        },
        {
          name: '驾驶员照片',
          properties: [
            {
              key: '驾驶员照片',
              value: this.selected.photoId
            }
          ]
        }
      ]
      this.insuranceTableItems = [
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
      this.totalMileTableItem = [
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
      this.$axios.get('/car/operation/order-info/list', { params: this.page })
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
