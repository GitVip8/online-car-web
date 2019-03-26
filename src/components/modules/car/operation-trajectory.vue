<template>
  <div class="amap-wrapper">
    <div id="map"></div>
  </div>
</template>
<script>
import remoteLoad from '@/util/remoteLoad'
export default {
  name: 'OperationTrajectory',
  async created () {
    if (window.AMap && window.AMapUI) {
      this.initMap()
    } else {
      await remoteLoad('http://webapi.amap.com/maps?v=1.4.13&key=55ec0ad062276ce52d5865405531678c')
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initMap()
    }
  },
  data () {
    return {
      lat: null,
      lng: null
    }
  },
  methods: {
    initMap () {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        let mapConfig = {
          zoom: 16,
          mapStyle: 'amap://styles/32675b6b0a84ab317bd069477b57e828'
        }
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat]
        }
        let map = new AMap.Map('map', mapConfig)
        // 启用工具条
        /* AMap.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar({
            position: 'RB'
          }))
        })
        */
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true
          } else {
            this.$emit('drag', positionResult)
          }
        })
        // 启动拖放
        positionPicker.start()
      })
    }
  }
}
</script>
<style>
.amap-wrapper{
  margin: -15px;
  box-shadow: 2px 2px 10px 2px;
}
#map {
  width: 100%;
  height: calc(100vh - 140px);
}
</style>
