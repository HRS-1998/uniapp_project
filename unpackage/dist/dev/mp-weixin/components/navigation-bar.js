"use strict";
const common_vendor = require("../common/vendor.js");
const store_global = require("../store/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "navigation-bar",
  props: {
    title: {},
    back: { type: Boolean },
    color: {},
    background: {}
  },
  setup(__props) {
    const props = __props;
    const { updateHeight } = store_global.useGlobalOptionStore();
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const navigationbarStyle = common_vendor.ref({});
    const navigationbarContentStyle = common_vendor.ref({});
    common_vendor.onMounted(() => {
      const windowInfo = common_vendor.index.getWindowInfo();
      common_vendor.index.__f__("log", "at components/navigation-bar.vue:82", 2, windowInfo.statusBarHeight);
      const statusBarHeight = windowInfo.statusBarHeight;
      const navheight = statusBarHeight + 44;
      navigationbarStyle.value = {
        background: props.background || "#fff",
        height: `${navheight}px`
      };
      updateHeight(navheight);
      const { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
      common_vendor.index.__f__("log", "at components/navigation-bar.vue:97", common_vendor.index.getMenuButtonBoundingClientRect(), "胶囊信息");
      navigationbarContentStyle.value = {
        backgroundColor: props.background || "#ffffff",
        color: props.color || "#000000",
        height: `${height}px`,
        top: `${top}px`
      };
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
        f: common_vendor.s(navigationbarContentStyle.value),
        g: common_vendor.s(navigationbarStyle.value),
        h: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04463a9d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/navigation-bar.js.map
