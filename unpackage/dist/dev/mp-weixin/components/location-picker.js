"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  (_component_van_icon + _component_van_loading + _component_van_cell)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "location-picker",
  props: {
    showIcon: { type: Boolean },
    placeholder: {},
    disabled: { type: Boolean }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentAddress = common_vendor.ref("定位中...");
    const location = common_vendor.ref({
      latitude: 0,
      longitude: 0
    });
    const isLoading = common_vendor.ref(false);
    const checkLocationAuth = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.getSetting({
          success: (res) => {
            if (res.authSetting["scope.userLocation"]) {
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
        common_vendor.index.authorize({
          scope: "scope.userLocation",
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
        common_vendor.index.getLocation({
          type: "gcj02",
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
    const reverseGeocode = async (latitude, longitude) => {
      try {
        return {
          address: "北京市朝阳区",
          formattedAddress: "北京市朝阳区某某街道某某号"
        };
      } catch (error) {
        common_vendor.index.__f__("error", "at components/location-picker.vue:80", "逆地理编码失败", error);
        return {
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          formattedAddress: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        };
      }
    };
    const handleLocation = async () => {
      if (props.disabled || isLoading.value)
        return;
      isLoading.value = true;
      try {
        try {
          await checkLocationAuth();
        } catch {
          try {
            await requestLocationAuth();
          } catch {
            common_vendor.index.showModal({
              title: "提示",
              content: "请在设置中打开位置权限",
              confirmText: "去设置",
              success: (res) => {
                if (res.confirm) {
                  common_vendor.index.openSetting();
                }
              }
            });
            return;
          }
        }
        const locationRes = await getLocationInfo();
        const { latitude, longitude } = locationRes;
        const addressInfo = await reverseGeocode(latitude, longitude);
        currentAddress.value = addressInfo.address;
        location.value = { latitude, longitude };
        emit("change", addressInfo.address, { latitude, longitude });
      } catch (error) {
        common_vendor.index.__f__("error", "at components/location-picker.vue:128", "获取位置信息失败", error);
        currentAddress.value = props.placeholder || "选择位置";
        common_vendor.index.showToast({
          title: "获取位置失败",
          icon: "none"
        });
      } finally {
        isLoading.value = false;
      }
    };
    const chooseLocation = () => {
      if (props.disabled)
        return;
      common_vendor.index.chooseLocation({
        success: (res) => {
          currentAddress.value = res.name;
          location.value = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          emit("change", res.name, location.value);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at components/location-picker.vue:152", "选择位置失败", err);
          if (err.errMsg.includes("auth deny")) {
            common_vendor.index.showModal({
              title: "提示",
              content: "请在设置中打开位置权限",
              confirmText: "去设置",
              success: (res) => {
                if (res.confirm) {
                  common_vendor.index.openSetting();
                }
              }
            });
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      handleLocation();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showIcon !== false
      }, _ctx.showIcon !== false ? {
        b: common_vendor.p({
          name: "location-o",
          size: "32rpx",
          color: "#e94359"
        })
      } : {}, {
        c: common_vendor.t(currentAddress.value || _ctx.placeholder || "选择位置"),
        d: isLoading.value
      }, isLoading.value ? {
        e: common_vendor.p({
          type: "spinner",
          size: "20rpx",
          color: "#999"
        })
      } : {
        f: common_vendor.p({
          name: "arrow",
          size: "28rpx",
          color: "#999"
        })
      }, {
        g: common_vendor.p({
          disabled: _ctx.disabled
        }),
        h: common_vendor.o(chooseLocation)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-582ff75e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/location-picker.js.map
