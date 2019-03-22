<template>
  <div>
    <div class="condition-container">
      <el-form :inline="true" v-model="condition" label-width="120px">
        <el-row>
          <el-form-item label="驾驶员姓名">
            <el-input size="small" v-model="condition.driverName" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="地区">
              <el-cascader :props="xzqhProps" size="small" v-model="condition.address"
                :options="xzqhList"
                filterable>
              </el-cascader>
          </el-form-item>
          <el-form-item label="平台名称">
            <el-select size="small" filterable v-model="condition.companyId" :clearable="true">
              <el-option v-for="c in companys" :key="c.name" :label="c.label" :value="c.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="default" @click="reset">重置</el-button>
            <el-button size="small" type="primary" @click="find">查询</el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="驾驶员手机号">
            <el-input size="small" v-model="condition.driverPhone" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="驾驶证号">
            <el-input size="small" v-model="condition.licenseId" :clearable="true"></el-input>
          </el-form-item>
        </el-row>
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
        :current-page="page.currentPage"
        :page-sizes="[10, 20,30, 50]"
        :page-size="page.size"
        :page-count="page.totalPages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalElements"
      ></el-pagination>
    </div>
    <el-dialog top="10vh" title="驾驶员详情" :visible.sync="dialogVisible" width="80%">
      <div class="dialog-content" v-if="selected">
        <el-tabs type="card" v-if="selected" value="first" @tab-click="handleTabSwitch">
          <el-tab-pane label="基本信息" name="first">
            <info-table :items="infoTableItems" :cols="2" ></info-table>
          </el-tab-pane>
          <el-tab-pane label="培训信息" name="second">
            <el-table size="small" :data="educate.tableData" stripe style="width: 100%">
              <el-table-column
                v-for="(column,index) in educate.educateColumn"
                :key="index"
                :prop="column.name"
                :label="column.label"
                :width="column.width < 1?'':(column.width + 'px')">
              </el-table-column>
            </el-table>
            <div class="page-container" v-if="page">
              <el-pagination
                background
                @size-change="findEducate"
                @current-change="findEducate"
                :current-page="educate.page.currentPage"
                :page-sizes="[10, 20,30, 50]"
                :page-size="educate.page.size"
                :page-count="educate.page.totalPages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="educate.page.totalElements"
              >
              </el-pagination>
          </div>
          </el-tab-pane>
          <el-tab-pane label="移动终端信息" name="third" :disabled="!selected.app">
            <info-table :items="app" :cols="1" ></info-table>
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
import { XZQH, parseAddress, parseDate } from '@/util/dic.js'
import { findCompany } from '@/api/pub.js'
export default {
  name: 'BaseDriver',

  components: {
    InfoTable
  },
  created () {
    if (XZQH) this.xzqh = XZQH
    this.find()
    this.findCompanyDic()
  },
  watch: {
    xzqh (a) {
      this.xzqhList = a
    },
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
      this.app = [
        {
          name: '移动终端信息',
          properties: [
            {
              key: '平台名称',
              value: this.selected.company.companyName
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
              key: '机动车驾驶证号',
              value: this.selected.licenseId
            },
            {
              key: '驾驶员手机号',
              value: this.selected.driverPhone
            },
            {
              key: '手机运营商',
              value: this.selected.app.netType
            },
            {
              key: '使用APP版本号',
              value: this.selected.app.appVersion
            },
            {
              key: '使用地图类型',
              value: this.selected.app.mapType
            }
          ]
        }
      ]
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
      companys: [],
      selected: null,
      infoTableItems: [],
      // 移动终端信息
      app: {},
      dialogVisible: false, // dialog是否可见
      // 查询列表显示字段
      tableColumn: [
        {
          name: 'driverName',
          label: '驾驶员姓名',
          width: 0
        },
        {
          name: 'driverPhone',
          label: '驾驶员手机号',
          width: 0
        },
        {
          name: 'driverGender',
          label: '驾驶员性别',
          width: 0
        },
        {
          name: 'company.companyName',
          label: '公司名称',
          width: 0
        },
        {
          name: 'address',
          label: '注册地',
          width: 0
        },
        {
          name: 'licenseId',
          label: '驾驶证号',
          width: 0
        }
      ],
      // table 的数据
      tableData: [],
      // 查询条件
      condition: {
        companyId: null,
        address: null,
        driverName: null,
        licenseId: null,
        driverPhone: null
      },
      // 分页信息
      page: {
        page: 1,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        sort: {}
      },
      educate: {
        tableData: [],
        educateColumn: [
          {
            name: 'courseName',
            label: '培训课程名称',
            width: 0
          },
          {
            name: 'courseDate',
            label: '培训课程日期',
            width: 0
          },
          {
            name: 'startTime',
            label: '培训开始时间',
            width: 0
          },
          {
            name: 'stopTime',
            label: '培训结束时间',
            width: 0
          },
          {
            name: 'duration',
            label: '培训时长',
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
        driverName: null,
        licenseId: null,
        driverPhone: null
      }
    },
    findCompanyDic () {
      findCompany().then(res => {
        this.companys = []
        let cs = res.data.data
        cs.forEach(a => this.companys.push({ code: a[0], label: a[1] }))
      })
    },
    // 查询所有
    find () {
      let postCondition = Object.assign({}, this.condition)
      if (postCondition.address) postCondition.address = postCondition.address[1]
      this.$axios
        .post('/car/basic/driver-info/list', {page: this.page, condition: postCondition})
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
      // 查询其他信息（里程、保险）
      this.$axios.get(`/car/basic/driver-info/${row.licenseId}`).then(r => {
        if (r.data.code === 0) {
          row.app = r.data.data.app
          // row.totalMile = r.data.data.totalMil
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
    },
    handleTabSwitch (a) {
      if (a.name !== 'second') return
      this.findEducate()
    },
    findEducate () {
      this.$axios
        .post(`/car/basic/driver-info/${this.selected.licenseId}/educate/list`, {page: this.educate.page, condition: null})
        .then(r => {
          if (r.data.code === 0) {
            var d = r.data.data
            this.educate.tableData = d.content.map(function (a) {
              a.courseDate = parseDate(a.courseDate)
              a.startTime = parseDate(a.startTime)
              a.stopTime = parseDate(a.stopTime)
              return a
            })
            this.educate.page = {
              totalPages: d.totalPages,
              totalElements: d.totalElements,
              page: (d.number + 1),
              size: d.size
            }
          } else this.$message.error(r.date.msg)
        })
    },
    handleSizeChangeEducate (a) {
      this.educate.page.size = a
      this.findEducate()
    },
    handleCurrentChangeEducate (b) {
      this.educate.page.page = b
      this.findEducate()
    }
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
