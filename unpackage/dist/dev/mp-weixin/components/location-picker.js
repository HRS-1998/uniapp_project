"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _component_u_loading = common_vendor.resolveComponent("u-loading");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  (_easycom_u_icon2 + _component_u_loading + _easycom_u_cell2)();
}
const _easycom_u_icon = () => "../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_cell = () => "../uni_modules/uview-plus/components/u-cell/u-cell.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_cell)();
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
    const handleLocation = async () => {
      if (props.disabled || isLoading.value)
        return;
      isLoading.value = true;
      try {
        common_vendor.index.getLocation({
          type: "gcj02",
          highAccuracyExpireTime: 3e3,
          isHighAccuracy: true,
          success: async (res) => {
            const { latitude, longitude } = res;
            common_vendor.index.request({
              url: "https://restapi.amap.com/v3/geocode/regeo",
              method: "GET",
              data: {
                key: "fdcbd1a63fa5fe1b64ac5b53de5ebb78",
                // 、高德地图key
                location: `${longitude},${latitude}`,
                extensions: "base",
                s: "rsx",
                sdkversion: "sdkVERSION"
              },
              success: (geoRes) => {
                let address = "";
                common_vendor.index.__f__("log", "at components/location-picker.vue:82", geoRes);
                if (geoRes.data && geoRes.data.regeocode) {
                  address = geoRes.data.regeocode.formatted_address || geoRes.data.regeocode.addressComponent.province;
                } else {
                  address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                }
                currentAddress.value = address;
                location.value = { latitude, longitude };
                emit("change", address, { latitude, longitude });
              },
              fail: () => {
                const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                currentAddress.value = address;
                location.value = { latitude, longitude };
                emit("change", address, { latitude, longitude });
              },
              complete: () => {
                isLoading.value = false;
              }
            });
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/location-picker.vue:109", "获取位置信息失败", err);
            currentAddress.value = props.placeholder || "选择位置";
            common_vendor.index.showToast({
              title: "获取位置失败",
              icon: "none"
            });
            isLoading.value = false;
          }
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at components/location-picker.vue:119", "获取位置信息失败", error);
        currentAddress.value = props.placeholder || "选择位置";
        common_vendor.index.showToast({
          title: "获取位置失败",
          icon: "none"
        });
        isLoading.value = false;
      }
    };
    const chooseLocation = () => {
      if (props.disabled)
        return;
      common_vendor.index.chooseLocation({
        success: (res) => {
          currentAddress.value = res.name || res.address;
          location.value = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          emit("change", res.name || res.address, location.value);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at components/location-picker.vue:143", "选择位置失败", err);
          if (err.errMsg && (err.errMsg.includes("fail auth deny") || err.errMsg.includes("fail authorize"))) {
            common_vendor.index.showModal({
              title: "权限拒绝",
              content: "请在设置中允许使用位置权限以正常使用地图功能",
              showCancel: true,
              confirmText: "去设置",
              success: (modalRes) => {
                if (modalRes.confirm) {
                  common_vendor.index.openSetting({
                    success: (settingRes) => {
                      if (settingRes.authSetting["scope.userLocation"]) {
                        chooseLocation();
                      }
                    }
                  });
                }
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "选择位置失败",
              icon: "none"
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
          name: "map",
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
          name: "arrow-right",
          size: "28rpx",
          color: "#999"
        })
      }, {
        g: common_vendor.p({
          disabled: _ctx.disabled
        }),
        h: common_vendor.o(chooseLocation),
        i: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-582ff75e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/location-picker.js.map
