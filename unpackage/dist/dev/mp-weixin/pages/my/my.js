"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_sticky2 + _easycom_u_icon2)();
}
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (NavigationBar + _easycom_u_sticky + _easycom_u_icon)();
}
const NavigationBar = () => "../../components/navigation-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const userInfo = common_vendor.ref({
      avatar: "",
      nickname: "未登录"
    });
    const menuList = common_vendor.ref([
      {
        id: 1,
        title: "关于我们",
        icon: "info-o",
        url: "/mypackage/pages/about/about"
      },
      {
        id: 2,
        title: "隐私政策",
        icon: "shield-o",
        url: "/mypackage/pages/about/privacypolicy"
      },
      {
        id: 3,
        title: "地图功能",
        icon: "map-o",
        url: "/pages/map/map"
      }
    ]);
    const navigateToPage = (url) => {
      common_vendor.index.navigateTo({
        url,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/my/my.vue:36", "页面跳转失败", err);
          common_vendor.index.showToast({
            title: "跳转失败",
            icon: "none"
          });
        }
      });
    };
    const handleLogin = () => {
      common_vendor.index.login({
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/my/my.vue:48", "登录成功", res.code);
          userInfo.value.nickname = "测试用户";
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/my/my.vue:53", "登录失败", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "我的",
          back: false,
          color: "black",
          background: "#FFF"
        }),
        b: userInfo.value.avatar || "/static/default-avatar.png",
        c: common_vendor.t(userInfo.value.nickname),
        d: common_vendor.o(handleLogin),
        e: common_vendor.f(menuList.value, (item, k0, i0) => {
          return {
            a: "2f1ef635-2-" + i0,
            b: common_vendor.p({
              name: item.icon,
              size: "36rpx"
            }),
            c: common_vendor.t(item.title),
            d: "2f1ef635-3-" + i0,
            e: item.id,
            f: common_vendor.o(($event) => navigateToPage(item.url), item.id)
          };
        }),
        f: common_vendor.p({
          name: "arrow",
          size: "28rpx"
        }),
        g: common_vendor.gei(_ctx, "")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
