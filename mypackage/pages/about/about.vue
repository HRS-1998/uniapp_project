<script setup lang="ts">
import { ref } from 'vue';
import NavigationBar from '../../../components/navigation-bar.vue';

// 响应式数据
const appInfo = ref({
  name: '示例应用',
  version: '1.0.0',
  description: '这是一个基于Uniapp开发的示例应用',
  copyright: '© 2024 Example App'
});

// 方法定义
const handleContact = () => {
  uni.makePhoneCall({
    phoneNumber: '400-123-4567',
    success: () => {
      console.log('拨打电话成功');
    },
    fail: (err) => {
      console.error('拨打电话失败', err);
    }
  });
};

const handleFeedback = () => {
  uni.navigateTo({
    url: '/packageB/pages/feedback/feedback'
  });
};
</script>

<template>
  <view class="about-container">
    <NavigationBar title="关于我们" :back="true" color="black" background="#FFF" />
    
    <view class="content">
      <!-- 应用Logo -->
      <view class="logo-section">
        <view class="logo">
          <u-icon name="star-o" size="120rpx" color="#1989fa"></u-icon>
        </view>
        <view class="app-name">{{ appInfo.name }}</view>
        <view class="app-version">版本 {{ appInfo.version }}</view>
      </view>
      
      <!-- 菜单列表 -->
      <view class="menu-section">
        <view class="menu-item" @tap="handleFeedback">
          <view class="menu-left">
            <u-icon name="chat-o" size="36rpx" color="#666"></u-icon>
            <text class="menu-title">意见反馈</text>
          </view>
          <view class="menu-right">
            <text class="menu-desc">帮助我们改进</text>
            <u-icon name="arrow" size="28rpx" color="#999"></u-icon>
          </view>
        </view>
        
        <view class="menu-item" @tap="handleContact">
          <view class="menu-left">
            <u-icon name="phone-o" size="36rpx" color="#666"></u-icon>
            <text class="menu-title">联系我们</text>
          </view>
          <view class="menu-right">
            <text class="menu-desc">400-123-4567</text>
            <u-icon name="arrow" size="28rpx" color="#999"></u-icon>
          </view>
        </view>
        
        <view class="menu-item" @tap="uni.navigateTo({ url: '/packageB/pages/about/privacypolicy' })">
          <view class="menu-left">
            <u-icon name="shield-o" size="36rpx" color="#666"></u-icon>
            <text class="menu-title">隐私政策</text>
          </view>
          <u-icon name="arrow" size="28rpx" color="#999"></u-icon>
        </view>
        
        <view class="menu-item" @tap="uni.navigateTo({ url: '/packageB/pages/about/useragreement' })">
          <view class="menu-left">
            <u-icon name="document-o" size="36rpx" color="#666"></u-icon>
            <text class="menu-title">用户协议</text>
          </view>
          <u-icon name="arrow" size="28rpx" color="#999"></u-icon>
        </view>
      </view>
      
      <!-- 版权信息 -->
      <view class="copyright">
        <text>{{ appInfo.description }}</text>
        <text>{{ appInfo.copyright }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.about-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding: 40rpx;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 30rpx;
  background: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.app-name {
  font-size: 36rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 10rpx;
}

.app-version {
  font-size: 28rpx;
  color: #666;
}

.menu-section {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 40rpx;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-left .u-icon {
  margin-right: 20rpx;
}

.menu-title {
  font-size: 32rpx;
  color: #333;
}

.menu-right {
  display: flex;
  align-items: center;
}

.menu-desc {
  font-size: 28rpx;
  color: #999;
  margin-right: 10rpx;
}

.copyright {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  line-height: 1.6;
}
</style>