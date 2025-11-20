// API工具类，封装Uniapp通用的API调用方法

// 基础请求配置
const baseConfig = {
  baseURL: 'https://api.example.com', // 实际项目中替换为真实的API地址
  timeout: 10000,
  header: {
    'Content-Type': 'application/json'
  }
};

// 通用请求方法
export const request = async (options: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  header?: any;
}): Promise<any> => {
  const {
    url,
    method = 'GET',
    data = {},
    header = {}
  } = options;

  // 合并请求头
  const requestHeader = { ...baseConfig.header, ...header };

  // 显示加载动画
  uni.showLoading({
    title: '加载中...',
    mask: true
  });

  try {
    // 发起请求
    const [err, res] = await uni.request({
      url: baseConfig.baseURL + url,
      method,
      data,
      header: requestHeader,
      timeout: baseConfig.timeout
    });

    if (err) {
      throw err;
    }

    const response = res as any;
    
    // 统一处理响应
    if (response.statusCode === 200) {
      return response.data;
    } else {
      throw new Error(`请求失败: ${response.statusCode}`);
    }
  } catch (error) {
    console.error('请求错误:', error);
    
    // 错误处理
    uni.showToast({
      title: error instanceof Error ? error.message : '网络错误',
      icon: 'none',
      duration: 2000
    });
    
    throw error;
  } finally {
    // 隐藏加载动画
    uni.hideLoading();
  }
};

// 封装GET请求
export const get = (url: string, params?: any, header?: any) => {
  return request({ url, method: 'GET', data: params, header });
};

// 封装POST请求
export const post = (url: string, data?: any, header?: any) => {
  return request({ url, method: 'POST', data, header });
};

// 封装PUT请求
export const put = (url: string, data?: any, header?: any) => {
  return request({ url, method: 'PUT', data, header });
};

// 封装DELETE请求
export const del = (url: string, data?: any, header?: any) => {
  return request({ url, method: 'DELETE', data, header });
};

// 存储相关工具
export const storage = {
  // 设置存储
  set: (key: string, value: any): void => {
    const strValue = typeof value === 'string' ? value : JSON.stringify(value);
    uni.setStorageSync(key, strValue);
  },
  
  // 获取存储
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const value = uni.getStorageSync(key);
      if (value === '' || value === null || value === undefined) {
        return defaultValue || null;
      }
      
      // 尝试解析JSON
      try {
        return JSON.parse(value);
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error('获取存储失败:', error);
      return defaultValue || null;
    }
  },
  
  // 删除存储
  remove: (key: string): void => {
    uni.removeStorageSync(key);
  },
  
  // 清空存储
  clear: (): void => {
    uni.clearStorageSync();
  }
};

// 位置相关工具
export const location = {
  // 获取位置信息
  getLocation: (type: 'gcj02' | 'wgs84' | 'bd09' = 'gcj02'): Promise<{
    latitude: number;
    longitude: number;
    speed?: number;
    accuracy?: number;
  }> => {
    return new Promise((resolve, reject) => {
      uni.getLocation({
        type,
        altitude: true,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 选择位置
  chooseLocation: (): Promise<{
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  }> => {
    return new Promise((resolve, reject) => {
      uni.chooseLocation({
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 打开地图
  openLocation: (latitude: number, longitude: number, name?: string, address?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      uni.openLocation({
        latitude,
        longitude,
        name: name || '',
        address: address || '',
        success: resolve,
        fail: reject
      });
    });
  }
};

// 登录相关工具
export const auth = {
  // 获取登录凭证
  login: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      uni.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(new Error(res.errMsg));
          }
        },
        fail: reject
      });
    });
  },
  
  // 获取用户信息
  getUserInfo: (): Promise<{
    userInfo: {
      nickName: string;
      avatarUrl: string;
      gender: number;
      country: string;
      province: string;
      city: string;
      language: string;
    };
    rawData: string;
    signature: string;
    encryptedData: string;
    iv: string;
  }> => {
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 获取设置信息
  getSetting: (): Promise<{
    authSetting: Record<string, boolean>;
  }> => {
    return new Promise((resolve, reject) => {
      uni.getSetting({
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 申请授权
  authorize: (scope: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      uni.authorize({
        scope,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 打开设置
  openSetting: (): Promise<{
    authSetting: Record<string, boolean>;
  }> => {
    return new Promise((resolve, reject) => {
      uni.openSetting({
        success: resolve,
        fail: reject
      });
    });
  }
};

// 提示相关工具
export const toast = {
  // 成功提示
  success: (title: string, duration: number = 2000): void => {
    uni.showToast({
      title,
      icon: 'success',
      duration
    });
  },
  
  // 失败提示
  error: (title: string, duration: number = 2000): void => {
    uni.showToast({
      title,
      icon: 'error',
      duration
    });
  },
  
  // 普通提示
  info: (title: string, duration: number = 2000): void => {
    uni.showToast({
      title,
      icon: 'none',
      duration
    });
  },
  
  // 加载提示
  loading: (title: string = '加载中', mask: boolean = false): void => {
    uni.showLoading({
      title,
      mask
    });
  },
  
  // 隐藏加载
  hideLoading: (): void => {
    uni.hideLoading();
  },
  
  // 确认对话框
  confirm: (options: {
    title: string;
    content: string;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      uni.showModal({
        ...options,
        success: (res) => {
          resolve(res.confirm);
        },
        fail: () => {
          resolve(false);
        }
      });
    });
  }
};

// 页面跳转相关工具
export const navigate = {
  // 保留当前页面，跳转到应用内的某个页面
  to: (url: string, params?: Record<string, any>): Promise<void> => {
    let fullUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryStr = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryStr}`;
    }
    
    return new Promise((resolve, reject) => {
      uni.navigateTo({
        url: fullUrl,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 关闭当前页面，跳转到应用内的某个页面
  replace: (url: string, params?: Record<string, any>): Promise<void> => {
    let fullUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryStr = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryStr}`;
    }
    
    return new Promise((resolve, reject) => {
      uni.redirectTo({
        url: fullUrl,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab: (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      uni.switchTab({
        url,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 关闭所有页面，打开到应用内的某个页面
  reLaunch: (url: string, params?: Record<string, any>): Promise<void> => {
    let fullUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryStr = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryStr}`;
    }
    
    return new Promise((resolve, reject) => {
      uni.reLaunch({
        url: fullUrl,
        success: resolve,
        fail: reject
      });
    });
  },
  
  // 返回上一页
  back: (delta: number = 1): void => {
    uni.navigateBack({ delta });
  }
};

// 导出默认对象
export default {
  request,
  get,
  post,
  put,
  delete: del,
  storage,
  location,
  auth,
  toast,
  navigate
};