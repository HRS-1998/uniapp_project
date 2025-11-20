"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
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
    const style = common_vendor.computed(() => {
      return {
        backgroundColor: props.background || "#ffffff",
        color: props.color || "#000000",
        height: props.height || "90rpx"
      };
    });
    const titleStyle = common_vendor.computed(() => {
      return {
        color: props.color || "#000000"
      };
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleHome = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight;
      common_vendor.index.__f__("log", "at components/navigation-bar.vue:44", "状态栏高度:", statusBarHeight);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.back
      }, _ctx.back ? {
        b: common_vendor.p({
          name: "arrow-left",
          size: "36rpx",
          color: props.color || "#000000"
        }),
        c: common_vendor.o(handleBack)
      } : {}, {
        d: common_vendor.t(_ctx.title),
        e: common_vendor.s(titleStyle.value),
        f: !_ctx.$slots.right
      }, !_ctx.$slots.right ? {
        g: common_vendor.p({
          name: "home-o",
          size: "36rpx",
          color: props.color || "#000000"
        }),
        h: common_vendor.o(handleHome)
      } : {}, {
        i: common_vendor.s(style.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04463a9d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/navigation-bar.js.map
