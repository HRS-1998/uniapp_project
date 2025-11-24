"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_van_sticky = common_vendor.resolveComponent("van-sticky");
  const _component_van_search = common_vendor.resolveComponent("van-search");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_slider = common_vendor.resolveComponent("van-slider");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_sticky + _component_van_search + _easycom_u_image2 + _component_van_tab + _component_van_tabs + _component_van_slider + _component_van_popup)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (NavigationBar + LocationPicker + _easycom_u_image)();
}
const NavigationBar = () => "../../components/navigation-bar.js";
const LocationPicker = () => "../../components/location-picker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useRouter();
    const show = common_vendor.ref(false);
    common_vendor.ref("home");
    const currTag = common_vendor.ref("non-right");
    const price = common_vendor.ref(50);
    common_vendor.ref("");
    const list = common_vendor.ref([
      {
        id: 56,
        name: "商品名称1商品名称1商品名称1商品名称1商品名称1"
      },
      {
        id: 57,
        name: "商品名称2商品名称2商品名称2商品名称2商品名称2"
      }
    ]);
    const showPopup = () => {
      show.value = true;
    };
    const bindMapTap = (title) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:150", title, "地址");
    };
    const bindDetailTap = () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      common_vendor.index.navigateTo({
        url: "/indexpackage/pages/goodsdetail/goodsdetail",
        success: () => {
          common_vendor.index.hideLoading();
        },
        fail: (err) => {
          common_vendor.index.hideLoading();
          common_vendor.index.__f__("error", "at pages/index/index.vue:164", "页面跳转失败", err);
          common_vendor.index.showToast({
            title: "跳转失败",
            icon: "none"
          });
        }
      });
    };
    const priceChange = (event) => {
      price.value = event.detail.value;
    };
    const onResetPopup = () => {
      price.value = 50;
      currTag.value = "non-right";
    };
    const getList = () => {
      list.value.push({
        id: (/* @__PURE__ */ new Date()).getTime(),
        name: "商品名称33333"
      });
    };
    const onSearch = (event) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:190", event.detail);
      getList();
    };
    const onTabsChange = (event) => {
      getList();
    };
    const onSubmitPopup = () => {
      getList();
      onClosePopup();
    };
    const onTag = (e) => {
      const type = e.currentTarget.dataset.type;
      currTag.value = type;
    };
    const onClosePopup = () => {
      show.value = false;
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "商城",
          back: false,
          color: "black",
          background: "#FFF"
        }),
        b: common_vendor.o(bindMapTap),
        c: common_vendor.p({
          ["show-icon"]: true
        }),
        d: common_vendor.o(onSearch),
        e: common_vendor.p({
          placeholder: "请输入购买的商品"
        }),
        f: common_vendor.p({
          ["offset-top"]: 90
        }),
        g: common_vendor.p({
          width: "100%",
          height: "100",
          src: "http://innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png"
        }),
        h: common_vendor.p({
          title: "霸王茶姬"
        }),
        i: common_vendor.p({
          title: "汉堡王"
        }),
        j: common_vendor.p({
          title: "星巴克"
        }),
        k: common_vendor.p({
          title: "肯德基"
        }),
        l: common_vendor.p({
          title: "肯德基2"
        }),
        m: common_vendor.p({
          title: "肯德基3"
        }),
        n: common_vendor.o(onTabsChange),
        o: common_vendor.p({
          swipeable: true
        }),
        p: common_vendor.o(showPopup),
        q: common_assets._imports_0,
        r: common_vendor.p({
          ["offset-top"]: 180
        }),
        s: common_vendor.o(onTag),
        t: common_vendor.n({
          "tag__item--checked": currTag.value === "non-right"
        }),
        v: common_vendor.o(onTag),
        w: common_vendor.n({
          "tag__item--checked": currTag.value === "right"
        }),
        x: common_vendor.o(priceChange),
        y: common_vendor.o(($event) => price.value = $event),
        z: common_vendor.p({
          ["active-color"]: "#ee0a24",
          min: 0,
          max: 100,
          modelValue: price.value
        }),
        A: common_vendor.o(onResetPopup),
        B: common_vendor.o(onSubmitPopup),
        C: common_vendor.o(onClosePopup),
        D: common_vendor.o(($event) => show.value = $event),
        E: common_vendor.p({
          position: "top",
          show: show.value
        }),
        F: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(bindDetailTap, item.id),
            c: item.id,
            d: index
          };
        }),
        G: common_assets._imports_1,
        H: common_assets._imports_2,
        I: common_assets._imports_3,
        J: common_vendor.gei(_ctx, "")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
