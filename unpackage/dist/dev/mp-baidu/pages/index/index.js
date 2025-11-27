"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_global = require("../../store/global.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _easycom_u_slider2 = common_vendor.resolveComponent("u-slider");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_image2 + _easycom_u_subsection2 + _easycom_u_slider2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_u_slider = () => "../../uni_modules/uview-plus/components/u-slider/u-slider.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (NavigationBar + LocationPicker + _easycom_u_search + _easycom_u_image + _easycom_u_subsection + _easycom_u_slider + _easycom_u_popup)();
}
const NavigationBar = () => "../../components/navigation-bar.js";
const LocationPicker = () => "../../components/location-picker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const { navigationbarStyleHeight } = store_global.useGlobalOptionStore();
    common_vendor.index.__f__("log", "at pages/index/index.vue:115", navigationbarStyleHeight, "高度");
    common_vendor.index.__f__("log", "at pages/index/index.vue:116", "mmm");
    const show = common_vendor.ref(false);
    common_vendor.ref("home");
    const currTag = common_vendor.ref("non-right");
    const price = common_vendor.ref(50);
    common_vendor.ref("");
    const searchData = common_vendor.ref("");
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
    const curTab = common_vendor.ref("霸王茶姫");
    const tabs = common_vendor.ref([
      "霸王茶姬",
      "汉堡王",
      "星巴克",
      "肯德基",
      "肯德基2",
      "肯德基3"
    ]);
    const showPopup = () => {
      show.value = true;
    };
    const bindMapTap = (title) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:152", title, "地址");
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
          common_vendor.index.__f__("error", "at pages/index/index.vue:166", "页面跳转失败", err);
          common_vendor.index.showToast({
            title: "跳转失败",
            icon: "none"
          });
        }
      });
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
      return common_vendor.e({
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
        d: common_vendor.j({
          "search": common_vendor.o(onSearch),
          "updateModelValue": common_vendor.o(($event) => searchData.value = $event)
        }),
        e: common_vendor.p({
          placeholder: "请输入购买的商品",
          ["show-action"]: false,
          shape: "square",
          searchIconColor: "#fff",
          modelValue: searchData.value
        }),
        f: common_vendor.p({
          width: "100%",
          height: "100",
          radius: "8px",
          src: "https://innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png"
        }),
        g: common_vendor.j({
          "change": common_vendor.o(onTabsChange)
        }),
        h: common_vendor.p({
          current: curTab.value,
          list: tabs.value,
          mode: "button",
          bgColor: "#f3f3f3",
          activeColor: "#ff6759",
          bold: true
        }),
        i: common_vendor.o(showPopup),
        j: common_assets._imports_0,
        k: common_vendor.o(onTag),
        l: common_vendor.n({
          "tag__item--checked": currTag.value === "non-right"
        }),
        m: common_vendor.o(onTag),
        n: common_vendor.n({
          "tag__item--checked": currTag.value === "right"
        }),
        o: show.value
      }, show.value ? {
        p: common_vendor.j({
          "updateModelValue": common_vendor.o(($event) => price.value = $event)
        }),
        q: common_vendor.p({
          ["active-color"]: "#ee0a24",
          min: 0,
          max: 100,
          modelValue: price.value
        })
      } : {}, {
        r: common_vendor.o(onResetPopup),
        s: common_vendor.o(onSubmitPopup),
        t: common_vendor.j({
          "close": common_vendor.o(onClosePopup),
          "updateShow": common_vendor.o(($event) => show.value = $event)
        }),
        v: common_vendor.p({
          position: "top",
          show: show.value
        }),
        w: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.id,
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        x: common_assets._imports_1,
        y: common_assets._imports_2,
        z: common_vendor.o(bindDetailTap),
        A: common_assets._imports_3,
        B: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
swan.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-baidu/pages/index/index.js.map
