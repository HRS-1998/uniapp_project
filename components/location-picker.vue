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

// 方法定义
const checkLocationAuth = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          resolve(true);
        } else {
          reject(false);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

const requestLocationAuth = () => {
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope: 'scope.userLocation',
      success: () => {
        resolve(true);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

const getLocationInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

const reverseGeocode = async (latitude: number, longitude: number) => {
  try {
    // 在实际项目中，这里可以调用地图服务的逆地理编码接口
    // 这里使用模拟数据
    return {
      address: '北京市朝阳区',
      formattedAddress: '北京市朝阳区某某街道某某号'
    };
  } catch (error) {
    console.error('逆地理编码失败', error);
    return {
      address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      formattedAddress: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
    };
  }
};

const handleLocation = async () => {
  if (props.disabled || isLoading.value) return;
  
  isLoading.value = true;
  try {
    // 检查定位权限
    try {
      await checkLocationAuth();
    } catch {
      try {
        await requestLocationAuth();
      } catch {
        uni.showModal({
          title: '提示',
          content: '请在设置中打开位置权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting();
            }
          }
        });
        return;
      }
    }
    
    // 获取位置信息
    const locationRes = await getLocationInfo();
    const { latitude, longitude } = locationRes as any;
    
    // 逆地理编码
    const addressInfo = await reverseGeocode(latitude, longitude);
    
    // 更新状态
    currentAddress.value = addressInfo.address;
    location.value = { latitude, longitude };
    
    // 触发事件
    emit('change', addressInfo.address, { latitude, longitude });
  } catch (error) {
    console.error('获取位置信息失败', error);
    currentAddress.value = props.placeholder || '选择位置';
    uni.showToast({
      title: '获取位置失败',
      icon: 'none'
    });
  } finally {
    isLoading.value = false;
  }
};

const chooseLocation = () => {
  if (props.disabled) return;
  
  uni.chooseLocation({
    success: (res) => {
      currentAddress.value = res.name;
      location.value = {
        latitude: res.latitude,
        longitude: res.longitude
      };
      emit('change', res.name, location.value);
    },
    fail: (err) => {
      console.error('选择位置失败', err);
      if (err.errMsg.includes('auth deny')) {
        uni.showModal({
          title: '提示',
          content: '请在设置中打开位置权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting();
            }
          }
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

<template>
  <view class="location-picker" @tap="chooseLocation">
    <van-cell :disabled="disabled">
      <template #title>
        <view class="location-content">
          <van-icon 
            v-if="showIcon !== false" 
            name="location-o" 
            size="32rpx" 
            color="#e94359" 
            class="location-icon"
          />
          <text class="location-text">{{ currentAddress || (placeholder || '选择位置') }}</text>
        </view>
      </template>
      <template #right-icon>
        <view v-if="isLoading" class="loading-icon">
          <van-loading type="spinner" size="20rpx" color="#999" />
        </view>
        <van-icon v-else name="arrow" size="28rpx" color="#999" />
      </template>
    </van-cell>
  </view>
</template>

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