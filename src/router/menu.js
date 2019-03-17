import AdminLayout from '@/layout/admin/AdminLayout'
import Login from '@/components/Login.vue'
import BaseDriver from '@/components/modules/car/base-driver.vue'
const menu = [
  {
    path: '/',
    name: '首页',
    component: AdminLayout,
    hide: true,
    meta: { requireUser: true }
  },
  {
    path: '/permission-entry',
    name: '许可信息录入',
    component: AdminLayout,
    meta: { requireUser: true },
    icon: 'fa fa-volume-control-phone',
    children: [
      {
        path: '',
        name: '平台公司许可信息录入',
        icon: 'fa fa-bookmark',
        component: Login
      },
      {
        path: '',
        name: '车辆许可信息录入',
        icon: 'fa fa-automobile',
        component: Login
      },
      {
        path: '',
        name: '驾驶员许可信息录入',
        icon: 'fa fa-drivers-license',
        component: Login
      }
    ]
  },
  {
    path: '/permission-compare',
    name: '许可信息对比',
    component: AdminLayout,
    icon: 'fa fa-puzzle-piece',
    meta: { requireUser: true },
    children: [
      {
        path: '/user',
        name: '服务机构信息查询',
        icon: 'fa fa-institution',
        component: Login
      },
      {
        path: '/user',
        name: '车辆信息查询',
        icon: 'fa fa-taxi',
        component: Login
      },
      {
        path: '/user',
        name: '驾驶员信息查询',
        icon: 'fa fa-drivers-license',
        component: Login
      }
    ]
  },
  {
    path: '/base-info',
    name: '平台基本信息',
    icon: 'fa fa-television',
    component: AdminLayout,
    meta: { requireUser: true },
    children: [
      {
        path: '/user',
        name: '平台公司信息查询',
        icon: 'fa fa-suitcase',
        component: Login
      },
      {
        path: '/user',
        name: '服务机构信息查询',
        icon: 'fa fa-rss-square',
        component: Login
      },
      {
        path: '/base-driver',
        name: '车辆信息查询',
        icon: 'fa fa-taxi',
        component: BaseDriver
      },
      {
        path: '/user',
        name: '驾驶员信息查询',
        icon: 'fa fa-drivers-license',
        component: Login
      },
      {
        path: '/user',
        name: '平台公司接入条件查询',
        icon: 'fa fa-paw',
        component: Login
      }
    ]
  },
  {
    path: '/base-service',
    name: '平台运营信息',
    component: AdminLayout,
    icon: 'fa fa-hourglass-3',
    meta: { requireUser: true },
    children: [
      {
        path: '/user',
        name: '订单信息查询',
        icon: 'fa fa-shopping-bag',
        component: Login
      },
      {
        path: '/user',
        name: '车辆轨迹查询',
        icon: 'fa fa-street-view',
        component: Login
      }
    ]
  },
  {
    path: '/report-forms',
    name: '平台统计报表',
    component: AdminLayout,
    icon: 'fa fa-area-chart',
    meta: { requireUser: true }
  },
  {
    path: '/data-analysis',
    name: '数据分析',
    component: AdminLayout,
    icon: 'fa fa-pie-chart',
    meta: { requireUser: true },
    children: [
      {
        path: '/user',
        name: '城市视角',
        icon: 'fa fa-subway',
        component: Login
      },
      {
        path: '/user',
        name: '平台视角',
        icon: 'fa fa-window-restore',
        component: Login
      }
    ]
  }
]
export default menu
