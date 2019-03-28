<template>
  <div class="amap-wrapper">
    <div id="map"></div>
    <div class='tools' title="查询车辆" @click="isWindowOpen = !isWindowOpen"><i class="el-icon-search"></i></div>
    <transition name="el-zoom-in-center">
      <div class="player" v-if="canPlay">
        <ul>
          <li @click="startAnimation">开始动画</li>
          <li @click="pauseAnimation">暂停动画</li>
          <li @click="resumeAnimation">继续动画</li>
          <li @click="stopAnimation">停止动画</li>
        </ul>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div class='window' v-if="isWindowOpen">
        <p class="title">车辆轨迹查询</p>
        <el-form size="small">
          <el-form-item label="车牌号" label-width="80px">
            <el-input v-model="form.vehicleNo"></el-input>
          </el-form-item>
          <el-form-item label="日期" label-width="80px">
              <el-date-picker
              v-model="form.date"
              type="date"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间" label-width="80px">
            <el-time-picker
              is-range
              v-model="form.time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-time-picker>
          </el-form-item>
        </el-form>
        <div class="btns">
          <el-button size="small" type="primary" @click="handleClick">查询</el-button>
          <el-button size="small" type="default" @click="isWindowOpen = false">取消</el-button>
        </div>
      </div>
    </transition>
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
      map: null,
      marker: null,
      linePath: [],
      form: {
        vehicleNo: '',
        date: null,
        time: null
      },
      isWindowOpen: false,
      canPlay: false,
      lat: null,
      lng: null
    }
  },
  methods: {
    initMap () {
      this.map = new window.AMap.Map('map', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 16,
        mapStyle: 'amap://styles/32675b6b0a84ab317bd069477b57e828'
      })
    },
    setMarker () {
      this.marker = new window.AMap.Marker({
        map: this.map,
        position: [116.478935, 39.997761],
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new window.AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      })
      this.marker.on('moving', (e) => {
        this.passedPolyline().setPath(e.passedPath)
        this.map.setFitView()
      })
      this.map.setFitView()
      this.palyLine()
    },
    palyLine () {
      return new window.AMap.Polyline({
        map: this.map,
        path: this.linePath,
        showDir: true,
        strokeColor: '#28F',
        // strokeOpacity: 1,
        strokeWeight: 6,
        strokeStyle: 'solid'
      })
    },
    passedPolyline () {
      return new window.AMap.Polyline({
        map: this.map,
        strokeColor: '#AF5',
        strokeWeight: 6
      })
    },
    startAnimation () {
      this.marker.moveAlong(this.linePath, 400)
    },
    pauseAnimation () {
      this.marker.pauseMove()
    },
    resumeAnimation () {
      this.marker.resumeMove()
    },
    stopAnimation () {
      this.marker.stopMove()
    },
    // 查询
    handleClick () {
      this.canPlay = true
      let lineArr = [
        [116.478935, 39.997761], [116.478939, 39.997825], [116.478912, 39.998549], [116.478912, 39.998549], [116.478998, 39.998555], [116.478998, 39.998555], [116.479282, 39.99856], [116.479658, 39.998528], [116.480151, 39.998453], [116.480784, 39.998302], [116.480784, 39.998302], [116.481149, 39.998184], [116.481573, 39.997997], [116.481863, 39.997846], [116.482072, 39.997718], [116.482362, 39.997718], [116.483633, 39.998935], [116.48367, 39.998968], [116.484648, 39.999861]
      ]
      this.linePath = lineArr
      this.setMarker()
    }
  }
}
</script>
<style>
.amap-wrapper{
  position: relative;
  margin: -15px;
  /* box-shadow: 2px 2px 10px 2px; */
}
#map {
  width: 100%;
  height: calc(100vh - 140px);
}
.tools{
  position: absolute;
  right: 10px;
  top: 10px;
  background: #000000c7;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.window{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 360px;
  height: 50%;
  background: #fff;
  box-shadow: -3px -3px 10px 0px;
}
.window .title {
  padding: 8px 10px;
  background: #293692;
  margin: 0;
  color: #fff;
  font-size: 13px;
  border: 1px solid #293692;
}
.window .el-form {
  padding: 15px;
}
.window .el-input__inner{
  width: 220px;
}
.window .btns{
  text-align: center
}
.player {
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  padding: 10px;
  font-size: 12px;
}
.player ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.player ul li {
  cursor: pointer;
  float: left;
  margin: 0 9px;
  border:1px solid #25A5F7;
  border-radius:12px;
  padding: 4px 12px;
  color: #25A5F7;
}
.player ul li:hover{
  background: #25A5F7;
  color:#fff;
}
</style>
