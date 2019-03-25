<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>
<script>
import 'AMap'
import * as L7 from '@antv/l7'
export default {
  name: 'OperationTrajectory',
  created () {
    this.init()
  },
  methods: {
    data () {
      return {
        scense: null
      }
    },
    init () {
      this.scene = new L7.Scene({
        id: 'map',
        mapStyle: 'dark', // 样式URL
        center: [102.602992, 23.107329],
        pitch: 15,
        zoom: 13.82
      })
      // 初始化地图，添加线图层
      this.scene.on('loaded', () => {
        this.$axios.get('https://gw.alipayobjects.com/os/rmsportal/ZVfOvhVCzwBkISNsuKCc.json').then((data) => {
          this.scene.LineLayer({
            zIndex: 2
          }).source(data).size('ELEV', function (value) {
            return [1, (value - 1000) * 7]
          }).active(true)
            .shape('line')
            .color('ELEV', ['#E8FCFF', '#CFF6FF', '#A1E9ff', '#65CEF7', '#3CB1F0', '#2894E0', '#1772c2', '#105CB3', '#0D408C', '#002466'].reverse())
            .render()
        }
        )
      })
    }
  }
}
</script>
<style>
.map-container{
  width: 800px;
  height: 500px;
}
</style>
