"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_sticky = common_vendor.resolveComponent("van-sticky");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_swipe_item = common_vendor.resolveComponent("van-swipe-item");
  const _component_van_swipe = common_vendor.resolveComponent("van-swipe");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  (_component_van_sticky + _component_van_loading + _component_van_swipe_item + _component_van_swipe + _component_van_icon)();
}
if (!Math) {
  NavigationBar();
}
const NavigationBar = () => "../../../components/navigation-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "goodsdetail",
  setup(__props) {
    const goodsId = common_vendor.ref("");
    const goodsInfo = common_vendor.ref({
      id: "",
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      description: "",
      specifications: [],
      details: []
    });
    const loading = common_vendor.ref(true);
    const getGoodsInfo = async () => {
      try {
        goodsInfo.value = {
          id: goodsId.value || "1",
          name: "示例商品",
          price: 99.9,
          originalPrice: 199.9,
          image: "/static/example.png",
          description: "这是一个示例商品的描述",
          specifications: [
            { name: "规格1", value: "默认" },
            { name: "规格2", value: "标准" }
          ],
          details: [
            { image: "/static/detail1.png" },
            { image: "/static/detail2.png" }
          ]
        };
      } catch (error) {
        common_vendor.index.__f__("error", "at packageA/pages/goodsdetail/goodsdetail.vue:41", "获取商品详情失败", error);
        common_vendor.index.showToast({
          title: "获取商品详情失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const addToCart = () => {
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    };
    const buyNow = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/confirm"
      });
    };
    common_vendor.onMounted(() => {
      var _a;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      goodsId.value = ((_a = currentPage.options) == null ? void 0 : _a.id) || "";
      getGoodsInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "商品详情",
          back: true,
          color: "black",
          background: "#FFF"
        }),
        b: loading.value
      }, loading.value ? {
        c: common_vendor.p({
          type: "spinner",
          color: "#1989fa"
        })
      } : {
        d: goodsInfo.value.image,
        e: common_vendor.p({
          autoplay: 3e3,
          ["indicator-dots"]: true
        }),
        f: common_vendor.t(goodsInfo.value.price),
        g: common_vendor.t(goodsInfo.value.originalPrice),
        h: common_vendor.t(goodsInfo.value.name),
        i: common_vendor.t(goodsInfo.value.description),
        j: common_vendor.f(goodsInfo.value.details, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        })
      }, {
        k: common_vendor.p({
          name: "cart-o",
          size: "48rpx",
          color: "#666"
        }),
        l: common_vendor.o(addToCart),
        m: common_vendor.o(buyNow),
        n: common_vendor.o(addToCart)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-542cbfbd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/packageA/pages/goodsdetail/goodsdetail.js.map
