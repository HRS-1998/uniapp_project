"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "navigation-bar",
  props: {
    title: {},
    back: { type: Boolean },
    color: {},
    background: {},
    height: {}
  },
  setup(__props) {
    const props = __props;
    common_vendor.computed(() => {
      return {
        backgroundColor: props.background || "#ffffff",
        color: props.color || "#000000",
        height: props.height || "90rpx"
      };
    });
    common_vendor.computed(() => {
      return {
        color: props.color || "#000000"
      };
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight;
      common_vendor.index.__f__("log", "at components/navigation-bar.vue:92", "状态栏高度:", statusBarHeight);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.back
      }, props.back ? common_vendor.e({
        b: props.back
      }, props.back ? {
        c: common_vendor.o(handleBack)
      } : {}) : {}, {
        d: props.title
      }, props.title ? {
        e: common_vendor.t(props.title)
      } : {}, {
        f: props.color,
        g: props.background,
        h: props.height,
        i: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04463a9d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/navigation-bar.js.map
