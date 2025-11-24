<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavigationBar from '../../../components/navigation-bar.vue';

// 响应式数据
const goodsId = ref('');
const goodsInfo = ref({
  id: '',
  name: '',
  price: 0,
  originalPrice: 0,
  image: '',
  description: '',
  specifications: [],
  details: []
});
const loading = ref(true);

// 方法定义
const getGoodsInfo = async () => {
  try {
    // 在实际项目中，这里应该调用接口获取商品详情
    // 这里使用模拟数据
    goodsInfo.value = {
      id: goodsId.value || '1',
      name: '示例商品',
      price: 99.9,
      originalPrice: 199.9,
      image: '/static/example.png',
      description: '这是一个示例商品的描述',
      specifications: [
        { name: '规格1', value: '默认' },
        { name: '规格2', value: '标准' }
      ],
      details: [
        { image: '/static/detail1.png' },
        { image: '/static/detail2.png' }
      ]
    };
  } catch (error) {
    console.error('获取商品详情失败', error);
    uni.showToast({
      title: '获取商品详情失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  uni.showToast({
    title: '已加入购物车',
    icon: 'success'
  });
};

const buyNow = () => {
  uni.navigateTo({
    url: '/pages/order/confirm'
  });
};

// 生命周期
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  goodsId.value = currentPage.options?.id || '';
  
  getGoodsInfo();
});
</script>

<template>
  <view class="goods-detail-container">
    <NavigationBar title="商品详情" :back="true" color="black" background="#FFF" />
    
    <van-sticky>
      <view class="nav-tabs">
        <view class="tab-item active">商品详情</view>
        <view class="tab-item">规格参数</view>
        <view class="tab-item">用户评价</view>
      </view>
    </van-sticky>
    
    <van-loading v-if="loading" type="spinner" color="#1989fa" />
    
    <view v-else class="goods-content">
      <!-- 商品轮播图 -->
      <view class="goods-image">
        <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-dots>
          <van-swipe-item>
            <image :src="goodsInfo.image" mode="aspectFill"></image>
          </van-swipe-item>
        </van-swipe> -->
      </view>
      
      <!-- 商品信息 -->
      <view class="goods-info">
        <view class="price-section">
          <text class="current-price">¥{{ goodsInfo.price }}</text>
          <text class="original-price">¥{{ goodsInfo.originalPrice }}</text>
        </view>
        <view class="name-section">{{ goodsInfo.name }}</view>
        <view class="desc-section">{{ goodsInfo.description }}</view>
      </view>
      
      <!-- 商品详情 -->
      <view class="goods-details">
        <view class="section-title">商品详情</view>
        <view class="detail-content">
          <view v-for="(item, index) in goodsInfo.details" :key="index" class="detail-image">
            <image :src="item.image" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="cart-btn" @tap="addToCart">
        <van-icon name="cart-o" size="48rpx" color="#666"></van-icon>
        <text class="btn-text">购物车</text>
      </view>
      <view class="buy-now" @tap="buyNow">立即购买</view>
      <view class="add-cart" @tap="addToCart">加入购物车</view>
    </view>
  </view>
</template>

<style scoped>
.goods-detail-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-tabs {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #1989fa;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 6rpx;
  background: #1989fa;
  border-radius: 3rpx;
}

.goods-image {
  width: 100%;
  height: 750rpx;
  background: #fff;
}

.my-swipe {
  height: 100%;
}

.my-swipe image {
  width: 100%;
  height: 100%;
}

.goods-info {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.price-section {
  margin-bottom: 20rpx;
}

.current-price {
  font-size: 44rpx;
  font-weight: bold;
  color: #e94359;
  margin-right: 20rpx;
}

.original-price {
  font-size: 28rpx;
  color: #999;
  text-decoration: line-through;
}

.name-section {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 15rpx;
  line-height: 1.4;
}

.desc-section {
  font-size: 28rpx;
  color: #666;
  line-height: 1.4;
}

.goods-details {
  background: #fff;
  padding: 30rpx;
}

.section-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 20rpx;
}

.detail-image {
  width: 100%;
  margin-bottom: 10rpx;
}

.detail-image image {
  width: 100%;
  height: auto;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.cart-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 8rpx;
}

.buy-now,
.add-cart {
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
  text-align: center;
}

.buy-now {
  background: #e94359;
  color: #fff;
  margin-left: 20rpx;
  flex: 1;
}

.add-cart {
  background: #ff9500;
  color: #fff;
  margin-left: 20rpx;
  flex: 1;
}
</style>