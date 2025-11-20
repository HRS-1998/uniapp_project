<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavigationBar from '../../components/navigation-bar.vue';
import LocationPicker from '../../components/location-picker.vue';

const router = useRouter();

// 响应式数据
const show = ref(false);
const current = ref('home');
const currTag = ref('non-right');
const price = ref(50);
const address = ref('');
const list = ref([
  {
    id: 56,
    name: '商品名称1商品名称1商品名称1商品名称1商品名称1',
  },
  {
    id: 57,
    name: '商品名称2商品名称2商品名称2商品名称2商品名称2',
  },
]);

// 方法定义
const showPopup = () => {
  show.value = true;
};

const bindMapTap = (title: string) => {
  console.log(title, '地址');
};

const bindDetailTap = () => {
  uni.showLoading({
    title: '加载中...',
  });
  uni.navigateTo({
    url: '/indexpackage/pages/goodsdetail/goodsdetail',
    success: () => {
      uni.hideLoading();
    },
    fail: (err) => {
      uni.hideLoading();
      console.error('页面跳转失败', err);
      uni.showToast({
        title: '跳转失败',
        icon: 'none',
      });
    },
  });
};

const priceChange = (event: any) => {
  price.value = event.detail.value;
};

const onResetPopup = () => {
  price.value = 50;
  currTag.value = 'non-right';
};

const getList = () => {
  list.value.push({
    id: new Date().getTime(),
    name: '商品名称33333',
  });
};

const onSearch = (event: any) => {
  console.log(event.detail);
  getList();
};

const onTabsChange = (event: any) => {
  getList();
};

const onSubmitPopup = () => {
  getList();
  onClosePopup();
};

const onTag = (e: any) => {
  const type = e.currentTarget.dataset.type;
  currTag.value = type;
};

const handleChange = (event: any) => {
  current.value = event.detail;
  uni.navigateTo({
    url: `../${event.detail}/${event.detail}`,
  });
};

const onClosePopup = () => {
  show.value = false;
};

// 生命周期
onMounted(() => {
  // 页面挂载时执行的逻辑
});
</script>

<template>
  <view>
    <van-sticky>
      <NavigationBar title="商城" :back="false" color="black" background="#FFF" />
    </van-sticky>
    <view class="shop">
      <view class="shop__top-con">
        <van-sticky :offset-top="90">
          <view>
            <LocationPicker @tap="bindMapTap" />
            <view><van-search @search="onSearch" placeholder="请输入购买的商品"></van-search></view>
          </view>
        </van-sticky>
        <view class="shop__banner">
          <van-image width="100%" height="100" src="//innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png" />
        </view>
        <van-sticky :offset-top="180">
          <view class="shop__tabs">
            <van-tabs @change="onTabsChange" swipeable>
              <van-tab title="霸王茶姬"></van-tab>
              <van-tab title="汉堡王"></van-tab>
              <van-tab title="星巴克"></van-tab>
              <van-tab title="肯德基"></van-tab>
              <van-tab title="肯德基2"></van-tab>
              <van-tab title="肯德基3"></van-tab>
            </van-tabs>
            <!-- <image class="more" @tap="showPopup" src="./img/more.png" mode="aspectFill"></image> -->
          </view>
        </van-sticky>
      </view>
      
      <van-popup v-model:show="show" position="top" @close="onClosePopup">
        <view class="popup">
          <view class="popup__head">商城</view>
          <view class="popup__main">
            <text class="title">商品类型</text>
            <view class="tag">
              <view 
                :data-type="'non-right'" 
                @tap="onTag" 
                :class="['tag__item', { 'tag__item--checked': currTag === 'non-right' }]"
              >
                非权益商品
              </view>
              <view 
                :data-type="'right'" 
                @tap="onTag" 
                :class="['tag__item', { 'tag__item--checked': currTag === 'right' }]"
              >
                权益商品
              </view>
            </view>
            <view class="mt-20">
              <text class="title">人均价筛选</text>
            </view>
            <view class="mt-20">
              <van-slider v-model="price" @change="priceChange" active-color="#ee0a24" :min="0" :max="100" />
            </view>
            <view class="mt-20 goods-choose__btn">
              <view class="btn btn-reset" @tap="onResetPopup">重置</view>
              <view class="btn btn-comfirm" @tap="onSubmitPopup">完成</view>
            </view>
          </view>
        </view>
      </van-popup>
      
      <view class="shop__goodslist">
        <view 
          v-for="(item, index) in list" 
          :key="item.id"
          :data="56"
          class="goodslist__box"
          :data-index="index"
        >
          <view class="goodsimg">
            <image mode="aspectFill" src="https://fdsimgtest.tcy365.com/ctrpashop/ct023116958-852f-4699-93af-b1626f8effbd.png" alt=""></image>
          </view>
          <view class="goodsname">
            <view @tap="bindDetailTap">
              <view class="goodsname__text">
                <!-- <image mode="aspectFill" class="icon-special" src="./img/vip.png"></image> -->
                <text class="name">{{ item.name }}</text>
              </view>
              <view class="goods-promotion">
                <view class="promotion">
                  <text>直降</text>
                  <!-- <image mode="aspectFill" class="icon-promotion" src="./img/down.png"></image> -->
                  <text>49.99元</text>
                </view>
              </view>
            </view>
            <view class="goodsprice goodsprice--rushorder-box">
              <!-- <image mode="aspectFill" class="goodsprice--rushorder" src="./img/sprice-bg.png"></image> -->
              <view class="goodsprice__text">
                <view class="pricedata">
                  <view class="saleprice">
                    <text class="unit">¥</text>
                    <text class="text">
                      <text>0</text>
                      <text class="decimal">.01 起</text>
                    </text>
                  </view>
                  <text class="price">
                    <text class="unit">¥</text>
                    <text>50</text>
                  </text>
                </view>
                <view class="success-rate">抢单成功率97.62%</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 样式需要从原scss文件转换 */
.shop {
  width: 100%;
  min-height: 100vh;
}

.shop__top-con {
  padding-bottom: 20rpx;
}

.shop__banner {
  width: 100%;
  height: 200rpx;
}

.shop__tabs {
  position: relative;
  background: #fff;
  padding: 20rpx 0;
}

.shop__tabs .more {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 24rpx;
  height: 24rpx;
}

.popup {
  background: #fff;
  padding: 30rpx;
}

.popup__head {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  font-size: 28rpx;
  color: #333;
}

.tag {
  display: flex;
  margin-top: 20rpx;
}

.tag__item {
  padding: 10rpx 30rpx;
  border: 1px solid #ddd;
  border-radius: 30rpx;
  margin-right: 20rpx;
  font-size: 24rpx;
}

.tag__item--checked {
  color: #e94359;
  border-color: #e94359;
}

.mt-20 {
  margin-top: 20rpx;
}

.goods-choose__btn {
  display: flex;
  justify-content: space-around;
  margin-top: 40rpx;
}

.btn {
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.btn-reset {
  background: #f5f5f5;
  color: #666;
}

.btn-comfirm {
  background: #e94359;
  color: #fff;
}

.shop__goodslist {
  padding: 20rpx;
}

.goodslist__box {
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.goodsimg {
  width: 100%;
  height: 400rpx;
}

.goodsimg image {
  width: 100%;
  height: 100%;
}

.goodsname {
  padding: 20rpx;
}

.goodsname__text {
  display: flex;
  align-items: center;
}

.icon-special {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.goods-promotion {
  margin-top: 10rpx;
}

.promotion {
  display: flex;
  align-items: center;
}

.promotion text {
  font-size: 20rpx;
  color: #e94359;
  margin-right: 10rpx;
}

.icon-promotion {
  width: 20rpx;
  height: 20rpx;
  margin-right: 5rpx;
}

.goodsprice {
  margin-top: 20rpx;
  position: relative;
}

.goodsprice--rushorder {
  position: absolute;
  left: 0;
  top: 0;
  width: 120rpx;
  height: 60rpx;
  z-index: 1;
}

.goodsprice__text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pricedata {
  display: flex;
  align-items: baseline;
}

.saleprice {
  color: #e94359;
  font-size: 32rpx;
  font-weight: bold;
}

.price {
  color: #999;
  font-size: 24rpx;
  margin-left: 20rpx;
  text-decoration: line-through;
}

.decimal {
  font-size: 24rpx;
  font-weight: normal;
}

.success-rate {
  font-size: 20rpx;
  color: #666;
}
</style>