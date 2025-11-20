<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import NavigationBar from '../../components/navigation-bar.vue';

// 响应式数据
const latitude = ref(39.9042);
const longitude = ref(116.4074);
const markers = ref([
  {
    id: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    title: '示例位置',
    iconPath: '/static/marker.png',
    width: 50,
    height: 50
  }
]);

// 方法定义
const getLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      latitude.value = res.latitude;
      longitude.value = res.longitude;
      // 更新标记点
      markers.value = [{
        id: 1,
        latitude: res.latitude,
        longitude: res.longitude,
        title: '当前位置',
        iconPath: '/static/marker.png',
        width: 50,
        height: 50
      }];
    },
    fail: (err) => {
      console.error('获取位置失败', err);
      uni.showToast({
        title: '获取位置失败',
        icon: 'none'
      });
    }
  });
};

const onMarkerTap = (e: any) => {
  console.log('点击了标记点', e);
  uni.showToast({
    title: '点击了标记点',
    icon: 'none'
  });
};

const onRegionChange = (e: any) => {
  // 地图视野变化时的回调
  if (e.type === 'end' && e.causedBy === 'drag') {
    console.log('地图拖动结束', e);
  }
};

// 生命周期
onMounted(() => {
  nextTick(() => {
    getLocation();
  });
});
</script>

<template>
  <view class="map-container">
    <NavigationBar title="地图" :back="true" color="black" background="#FFF" />
    
    <view class="map-wrapper">
      <map
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        style="width: 100%; height: 100vh;"
        @markertap="onMarkerTap"
        @regionchange="onRegionChange"
        enable-zoom
        enable-scroll
        enable-rotate
      ></map>
    </view>
    
    <view class="map-controls">
      <view class="control-item" @tap="getLocation">
        <van-icon name="location-o" size="40rpx"></van-icon>
      </view>
      <view class="control-item" @tap="uni.navigateTo({ url: '/pages/map/mapList' })">
        <van-icon name="list" size="40rpx"></van-icon>
      </view>
    </view>
  </view>
</template>

<style scoped>
.map-container {
  position: relative;
  height: 100vh;
  width: 100%;
}

.map-wrapper {
  padding-top: 90rpx; /* 导航栏高度 */
  height: 100%;
  box-sizing: border-box;
}

.map-controls {
  position: fixed;
  right: 30rpx;
  bottom: 200rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.control-item {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}
</style>