<script setup lang="ts">
import { ref } from 'vue';
import NavigationBar from '../../components/navigation-bar.vue';

// 响应式数据
const userInfo = ref({
  avatar: '',
  nickname: '未登录'
});
const menuList = ref([
  {
    id: 1,
    title: '关于我们',
    icon: 'info-o',
    url: '/mypackage/pages/about/about'
  },
  {
    id: 2,
    title: '隐私政策',
    icon: 'shield-o',
    url: '/mypackage/pages/about/privacypolicy'
  },
  {
    id: 3,
    title: '地图功能',
    icon: 'map-o',
    url: '/pages/map/map'
  }
]);

// 方法定义
const navigateToPage = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error('页面跳转失败', err);
      uni.showToast({
        title: '跳转失败',
        icon: 'none'
      });
    }
  });
};

const handleLogin = () => {
  uni.login({
    success: (res) => {
      console.log('登录成功', res.code);
      // 这里可以添加登录逻辑
      userInfo.value.nickname = '测试用户';
    },
    fail: (err) => {
      console.error('登录失败', err);
    }
  });
};
</script>

<template>
  <view>
    <van-sticky>
      <NavigationBar title="我的" :back="false" color="black" background="#FFF" />
    </van-sticky>
    
    <view class="my-container">
      <!-- 用户信息区域 -->
      <view class="user-info" @tap="handleLogin">
        <view class="avatar">
          <image :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
        </view>
        <view class="nickname">{{ userInfo.nickname }}</view>
        <view class="arrow">></view>
      </view>
      
      <!-- 菜单列表 -->
      <view class="menu-section">
        <view 
          v-for="item in menuList" 
          :key="item.id" 
          class="menu-item"
          @tap="navigateToPage(item.url)"
        >
          <view class="menu-left">
            <van-icon :name="item.icon" size="36rpx"></van-icon>
            <text class="menu-title">{{ item.title }}</text>
          </view>
          <van-icon name="arrow" size="28rpx"></van-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.my-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.user-info {
  background: #fff;
  padding: 40rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
}

.avatar image {
  width: 100%;
  height: 100%;
}

.nickname {
  flex: 1;
  margin-left: 30rpx;
  font-size: 32rpx;
  color: #333;
}

.arrow {
  font-size: 32rpx;
  color: #999;
}

.menu-section {
  background: #fff;
  padding: 0 40rpx;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-left .van-icon {
  margin-right: 20rpx;
  color: #666;
}

.menu-title {
  font-size: 28rpx;
  color: #333;
}
</style>