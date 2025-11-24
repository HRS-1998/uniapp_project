<script setup lang="ts">
import { ref } from 'vue';
import NavigationBar from '../../../components/navigation-bar.vue';

// 响应式数据
const content = ref([
  {
    title: '隐私政策',
    text: '本隐私政策描述了我们如何收集、使用和保护您的个人信息。请仔细阅读本政策，了解我们的做法。'
  },
  {
    title: '1. 信息收集',
    text: '我们可能收集您的基本个人信息，如姓名、联系方式、位置信息等。这些信息仅用于提供服务和改进用户体验。'
  },
  {
    title: '2. 信息使用',
    text: '我们使用收集的信息来提供、维护和改进我们的服务，开发新功能，并保护用户安全。'
  },
  {
    title: '3. 信息共享',
    text: '我们不会在未经您同意的情况下向第三方共享您的个人信息，除非法律要求或为保护我们的权利。'
  },
  {
    title: '4. 数据安全',
    text: '我们采取合理措施保护您的个人信息免受未授权访问或披露。'
  },
  {
    title: '5. 政策更新',
    text: '我们可能会不时更新本隐私政策，并在应用内通知您重要变更。'
  }
]);
</script>

<template>
  <view class="privacy-container">
    <NavigationBar title="隐私政策" :back="true" color="black" background="#FFF" />
    
    <scroll-view scroll-y class="content">
      <view class="privacy-content">
        <view v-for="(item, index) in content" :key="index" class="section">
          <view class="section-title" v-if="item.title">{{ item.title }}</view>
          <view class="section-text" v-if="item.text">{{ item.text }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.privacy-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  height: calc(100vh - 90rpx);
}

.privacy-content {
  padding: 30rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
}

.section-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  text-indent: 56rpx;
}
</style>