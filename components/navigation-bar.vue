<script setup lang="ts">
import { computed, onMounted } from 'vue';

// Props定义
const props = defineProps<{
  title: string;
  back?: boolean;
  color?: string;
  background?: string;
  height?: string;
}>();

// 计算属性
const style = computed(() => {
  return {
    backgroundColor: props.background || '#ffffff',
    color: props.color || '#000000',
    height: props.height || '90rpx'
  };
});

const titleStyle = computed(() => {
  return {
    color: props.color || '#000000'
  };
});

// 方法定义
const handleBack = () => {
  uni.navigateBack();
};

const handleHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  });
};

// 生命周期
onMounted(() => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();
  const statusBarHeight = systemInfo.statusBarHeight;
  console.log('状态栏高度:', statusBarHeight);
});
</script>

<template>
  <view class="navigation-bar" :style="style">
    <view class="navigation-bar-content">
      <!-- 左侧按钮 -->
      <view class="left-btn" v-if="back">
        <view class="btn-item" @tap="handleBack">
          <van-icon name="arrow-left" size="36rpx" :color="props.color || '#000000'" />
        </view>
      </view>
      <!-- 占位符，用于标题居中 -->
      <view class="placeholder" v-else></view>
      
      <!-- 标题 -->
      <view class="title" :style="titleStyle">{{ title }}</view>
      
      <!-- 右侧插槽 -->
      <view class="right-content">
        <slot name="right"></slot>
        <view class="btn-item" v-if="!$slots.right" @tap="handleHome">
          <van-icon name="home-o" size="36rpx" :color="props.color || '#000000'" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.navigation-bar {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 10;
}

.navigation-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.left-btn,
.right-content,
.placeholder {
  width: 80rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 36rpx;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-item {
  width: 80rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-content {
  justify-content: flex-end;
}

.left-btn {
  justify-content: flex-start;
}
</style>