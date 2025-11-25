
<template>
  <view class="location-picker" @tap="chooseLocation">
    <u-cell :disabled="disabled">
      <template #title>
        <view class="location-content">
       <!--   <van-icon 
            v-if="showIcon !== false" 
            name="location-o" 
            size="32rpx" 
            color="#e94359" 
            class="location-icon"
          /> -->
		  <u-icon 
            v-if="showIcon !== false" 
            name="map" 
            size="32rpx" 
            color="#e94359" 
            class="location-icon"
          />
          <text class="location-text">{{ currentAddress || (placeholder || '选择位置') }}</text>
        </view>
      </template>
      <template #right-icon>
        <view v-if="isLoading" class="loading-icon">
          <u-loading type="spinner" size="20rpx" color="#999" />
        </view>
        <!-- <van-icon v-else name="arrow" size="28rpx" color="#999" /> -->
        <u-icon v-else name="arrow-right" size="28rpx" color="#999" />
      </template>
    </u-cell>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Props定义
const props = defineProps<{
  showIcon?: boolean;
  placeholder?: string;
  disabled?: boolean;
}>();

// Emits定义
const emit = defineEmits<{
  'change': [address: string, location: { latitude: number; longitude: number }];
}>();

// 响应式数据
const currentAddress = ref('定位中...');
const location = ref<{ latitude: number; longitude: number }>({
  latitude: 0,
  longitude: 0
});
const isLoading = ref(false);

const handleLocation = async () => {
  if (props.disabled || isLoading.value) return;
  
  isLoading.value = true;
  try {
    // 获取位置信息
    uni.getLocation({
      type: 'gcj02',
	  highAccuracyExpireTime:3000,
	  isHighAccuracy:true,
      success: async (res) => {
        const { latitude, longitude } = res;
        uni.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          method: 'GET',
          data: {
            key: 'fdcbd1a63fa5fe1b64ac5b53de5ebb78', // 、高德地图key
            location: `${longitude},${latitude}`,
            extensions: 'base',
            s: 'rsx',
            sdkversion: 'sdkVERSION'
          },
          success: (geoRes: any) => {
            let address = '';
			console.log(geoRes)
            if (geoRes.data && geoRes.data.regeocode) {
				
              address = geoRes.data.regeocode.formatted_address || geoRes.data.regeocode.addressComponent.province;
            } else {
              address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            }
            
            // 更新状态
            currentAddress.value = address;
            location.value = { latitude, longitude };
            
            // 触发事件
            emit('change', address, { latitude, longitude });
          },
          fail: () => {
            const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            currentAddress.value = address;
            location.value = { latitude, longitude };
            emit('change', address, { latitude, longitude });
          },
          complete: () => {
            isLoading.value = false;
          }
        });
      },
      fail: (err) => {
        console.error('获取位置信息失败', err);
        currentAddress.value = props.placeholder || '选择位置';
        uni.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
        isLoading.value = false;
      }
    });
  } catch (error) {
    console.error('获取位置信息失败', error);
    currentAddress.value = props.placeholder || '选择位置';
    uni.showToast({
      title: '获取位置失败',
      icon: 'none'
    });
    isLoading.value = false;
  }
};

const chooseLocation = () => {
  if (props.disabled) return;
  
  // 使用UniApp的地图选择位置功能
  uni.chooseLocation({
    success: (res) => {
      currentAddress.value = res.name || res.address;
      location.value = {
        latitude: res.latitude,
        longitude: res.longitude
      };
      emit('change', res.name || res.address, location.value);
    },
    fail: (err) => {
      console.error('选择位置失败', err);
      // 处理用户拒绝授权的情况
      if (err.errMsg && (err.errMsg.includes('fail auth deny') || err.errMsg.includes('fail authorize'))) {
        uni.showModal({
          title: '权限拒绝',
          content: '请在设置中允许使用位置权限以正常使用地图功能',
          showCancel: true,
          confirmText: '去设置',
          success: (modalRes) => {
            if (modalRes.confirm) {
              // 打开应用设置页面
              uni.openSetting({
                success: (settingRes) => {
                  if (settingRes.authSetting['scope.userLocation']) {
                    // 用户打开了位置权限，重新尝试获取位置
                    chooseLocation();
                  }
                }
              });
            }
          }
        });
      } else {
        uni.showToast({
          title: '选择位置失败',
          icon: 'none'
        });
      }
    }
  });
};

// 生命周期
onMounted(() => {
  // 自动获取位置
  handleLocation();
});
</script>


<style scoped>
.location-picker {
  width: 100%;
}

.location-content {
  display: flex;
  align-items: center;
}

.location-icon {
  margin-right: 12rpx;
}

.location-text {
  font-size: 28rpx;
  color: #333;
}

.loading-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>