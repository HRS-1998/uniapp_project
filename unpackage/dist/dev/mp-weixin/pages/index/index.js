"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_sticky = common_vendor.resolveComponent("van-sticky");
  const _component_van_search = common_vendor.resolveComponent("van-search");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_slider = common_vendor.resolveComponent("van-slider");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_sticky + _component_van_search + _component_van_image + _component_van_tab + _component_van_tabs + _component_van_slider + _component_van_popup)();
}
if (!Math) {
  (NavigationBar + LocationPicker)();
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
    const bindMapTap = (title) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:32", title, "地址");
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
          common_vendor.index.__f__("error", "at pages/index/index.vue:46", "页面跳转失败", err);
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
      common_vendor.index.__f__("log", "at pages/index/index.vue:72", event.detail);
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
        c: common_vendor.o(onSearch),
        d: common_vendor.p({
          placeholder: "请输入购买的商品"
        }),
        e: common_vendor.p({
          offsetTop: 90
        }),
        f: common_vendor.p({
          width: "100%",
          height: "100",
          src: "//innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png"
        }),
        g: common_vendor.p({
          title: "霸王茶姬"
        }),
        h: common_vendor.p({
          title: "汉堡王"
        }),
        i: common_vendor.p({
          title: "星巴克"
        }),
        j: common_vendor.p({
          title: "肯德基"
        }),
        k: common_vendor.p({
          title: "肯德基2"
        }),
        l: common_vendor.p({
          title: "肯德基3"
        }),
        m: common_vendor.o(onTabsChange),
        n: common_vendor.p({
          swipeable: true
        }),
        o: common_vendor.p({
          offsetTop: 180
        }),
        p: common_vendor.o(onTag),
        q: common_vendor.n({
          "tag__item--checked": currTag.value === "non-right"
        }),
        r: common_vendor.o(onTag),
        s: common_vendor.n({
          "tag__item--checked": currTag.value === "right"
        }),
        t: common_vendor.o(priceChange),
        v: common_vendor.o(($event) => price.value = $event),
        w: common_vendor.p({
          activeColor: "#ee0a24",
          min: 0,
          max: 100,
          modelValue: price.value
        }),
        x: common_vendor.o(onResetPopup),
        y: common_vendor.o(onSubmitPopup),
        z: common_vendor.o(onClosePopup),
        A: common_vendor.o(($event) => show.value = $event),
        B: common_vendor.p({
          position: "top",
          show: show.value
        }),
        C: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(bindDetailTap, item.id),
            c: item.id,
            d: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
