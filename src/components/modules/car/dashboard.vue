<template>
  <div>
    <div id="map" class='map'></div>
  </div>
</template>

<script>
import remoteLoad from '@/util/remoteLoad'
import * as L7 from '@antv/l7'
import $ from 'jquery'
export default {
  name: 'Dashboard',
  async created () {
    console.info('L7', L7)
    if (!window.AMap) {
      await remoteLoad('http://webapi.amap.com/maps?v=1.4.13&key=55ec0ad062276ce52d5865405531678c')
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
    }
    this.init()
  },
  methods: {
    init () {
      const scene = new L7.Scene({
        id: 'map',
        mapStyle: 'dark', // 样式URL
        center: [121.507674, 31.223043],
        pitch: 65.59312320916906,
        zoom: 15.4,
        minZoom: 15,
        maxZoom: 18
      })
      scene.on('loaded', () => {
        $.get('https://gw.alipayobjects.com/os/rmsportal/kNDVHmyUWAKhWmWXmjxM.json', (data) => {
          scene.LineLayer({
            zIndex: 2
          }).source(data).color('#F08D41').animate({
            enable: true
          }).render()
        })
        $.get('https://gw.alipayobjects.com/os/rmsportal/vmvAxgsEwbpoSWbSYvix.json', (data) => {
          scene.PolygonLayer({
            zIndex: 2
          }).source(data).shape('extrude').size('floor', [0, 2000]).color('rgba(242,246,250,1.0)').animate({
            enable: true
          }).style({
            opacity: 1.0,
            baseColor: 'rgb(16,16,16)',
            windowColor: 'rgb(30,60,89)',
            // brightColor:'rgb(155,217,255)'
            brightColor: 'rgb(255,176,38)'
          }).render()
        })
      })
    }
  }
}
</script>
<style>
.map {
  width: 100%;
  height: calc(100vh - 150px);
}
.content {
  margin: -15px;
}
</style>
