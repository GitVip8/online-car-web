import AdminLayout from '@/layout/admin/AdminLayout'
import BaseDriver from '@/components/modules/car/base-driver.vue'
import BaseVehicle from '@/components/modules/car/base-vehicle.vue'
import BaseService from '@/components/modules/car/base-service.vue'
import OperationOrder from '@/components/modules/car/operation-order.vue'
import OperationTrajectory from '@/components/modules/car/operation-trajectory.vue'
import E404 from '@/components/E404.vue'
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
        path: '/company-entry',
        name: '平台公司许可信息录入',
        icon: 'fa fa-bookmark',
        component: E404
      },
      {
        path: '/vehicle-entry',
        name: '车辆许可信息录入',
        icon: 'fa fa-automobile',
        component: E404
      },
      {
        path: '/driver-entry',
        name: '驾驶员许可信息录入',
        icon: 'fa fa-drivers-license',
        component: E404
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
        path: '/service-compare',
        name: '服务机构信息查询',
        icon: 'fa fa-institution',
        component: E404
      },
      {
        path: '/vehicle-compare',
        name: '车辆信息查询',
        icon: 'fa fa-taxi',
        component: E404
      },
      {
        path: '/driver-compare',
        name: '驾驶员信息查询',
        icon: 'fa fa-drivers-license',
        component: E404
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
        path: '/base-company',
        name: '平台公司信息查询',
        icon: 'fa fa-suitcase',
        component: E404
      },
      {
        path: '/base-service',
        name: '服务机构信息查询',
        icon: 'fa fa-rss-square',
        component: BaseService
      },
      {
        path: '/base-car',
        name: '车辆信息查询',
        icon: 'fa fa-taxi',
        component: BaseVehicle
      },
      {
        path: '/base-driver',
        name: '驾驶员信息查询',
        icon: 'fa fa-drivers-license',
        component: BaseDriver
      },
      {
        path: '/base-condition',
        name: '平台公司接入条件查询',
        icon: 'fa fa-paw',
        component: E404
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
        path: '/operation-order',
        name: '订单信息查询',
        icon: 'fa fa-shopping-bag',
        component: OperationOrder
      },
      {
        path: '/operation-trajectory',
        name: '车辆轨迹查询',
        icon: 'fa fa-street-view',
        component: OperationTrajectory
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
        path: '/city-analysis',
        name: '城市视角',
        icon: 'fa fa-subway',
        component: E404
      },
      {
        path: '/paltform-analysis',
        name: '平台视角',
        icon: 'fa fa-window-restore',
        component: E404
      }
    ]
  }
]
export default menu
