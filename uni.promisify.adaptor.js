// Promise 标准化处理
// 拦截所有 uni-app API 的返回值
// 对于已经是 Promise 形式的返回值（符合 (!!res && (typeof res === "object" || typeof res === "function") && typeof res.// then === "function") 条件），进行统一包装处理
// 错误处理标准化
//
// 将回调风格的 [Error, Data] 数组格式转换为标准 Promise
// 如果 res[0] 存在，则表示有错误，调用 reject(res[0])
// 如果 res[0] 不存在，则表示成功，调用 resolve(res[1])
// 兼容性适配

// 保证所有 API 调用都返回标准的 Promise 对象
// 让开发者可以统一使用 .then() 或 await 方式处理异步操作
uni.addInterceptor({
  returnValue(res) {
    if (
      !(
        !!res &&
        (typeof res === 'object' || typeof res === 'function') &&
        typeof res.then === 'function'
      )
    ) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => {
        if (!res) return resolve(res);
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  },
});
