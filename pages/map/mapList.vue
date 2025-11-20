<script setup lang="ts">
import { ref } from 'vue';
import NavigationBar from '../../components/navigation-bar.vue';

// 响应式数据
const locationList = ref([
  {
    id: 1,
    name: '示例位置1',
    address: '北京市朝阳区某某街道',
    distance: '1.2km',
    latitude: 39.9042,
    longitude: 116.4074
  },
  {
    id: 2,
    name: '示例位置2',
    address: '北京市海淀区中关村大街',
    distance: '3.5km',
    latitude: 39.9842,
    longitude: 116.3074
  },
  {
    id: 3,
    name: '示例位置3',
    address: '北京市西城区西单大街',
    distance: '5.8km',
    latitude: 39.9142,
    longitude: 116.3774
  }
]);

// 方法定义
const selectLocation = (item: any) => {
  console.log('选择了位置', item);
  // 这里可以添加选择位置后的逻辑
  uni.navigateBack();
};

const navigateToMap = () => {
  uni.navigateTo({
    url: '/pages/map/map'
  });
};
</script>

<template>
  <view class="map-list-container">
    <NavigationBar title="位置列表" :back="true" color="black" background="#FFF" />
    
    <view class="list-wrapper">
      <view 
        v-for="item in locationList" 
        :key="item.id" 
        class="location-item"
        @tap="selectLocation(item)"
      >
        <view class="location-icon">
          <van-icon name="location-o" size="40rpx" color="#e94359"></van-icon>
        </view>
        <view class="location-info">
          <view class="location-name">{{ item.name }}</view>
          <view class="location-address">{{ item.address }}</view>
        </view>
        <view class="location-distance">{{ item.distance }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.map-list-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.list-wrapper {
  padding: 20rpx;
}

.location-item {
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
}

.location-icon {
  margin-right: 20rpx;
}

.location-info {
  flex: 1;
}

.location-name {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.location-address {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.location-distance {
  font-size: 24rpx;
  color: #e94359;
}
</style>