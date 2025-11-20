"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
if (!Math) {
  NavigationBar();
}
const NavigationBar = () => "../../../components/navigation-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "about",
  setup(__props) {
    const appInfo = common_vendor.ref({
      name: "示例应用",
      version: "1.0.0",
      description: "这是一个基于Uniapp开发的示例应用",
      copyright: "© 2024 Example App"
    });
    const handleContact = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "400-123-4567",
        success: () => {
          common_vendor.index.__f__("log", "at packageB/pages/about/about.vue:18", "拨打电话成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at packageB/pages/about/about.vue:21", "拨打电话失败", err);
        }
      });
    };
    const handleFeedback = () => {
      common_vendor.index.navigateTo({
        url: "/packageB/pages/feedback/feedback"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "关于我们",
          back: true,
          color: "black",
          background: "#FFF"
        }),
        b: common_vendor.p({
          name: "star-o",
          size: "120rpx",
          color: "#1989fa"
        }),
        c: common_vendor.t(appInfo.value.name),
        d: common_vendor.t(appInfo.value.version),
        e: common_vendor.p({
          name: "chat-o",
          size: "36rpx",
          color: "#666"
        }),
        f: common_vendor.p({
          name: "arrow",
          size: "28rpx",
          color: "#999"
        }),
        g: common_vendor.o(handleFeedback),
        h: common_vendor.p({
          name: "phone-o",
          size: "36rpx",
          color: "#666"
        }),
        i: common_vendor.p({
          name: "arrow",
          size: "28rpx",
          color: "#999"
        }),
        j: common_vendor.o(handleContact),
        k: common_vendor.p({
          name: "shield-o",
          size: "36rpx",
          color: "#666"
        }),
        l: common_vendor.p({
          name: "arrow",
          size: "28rpx",
          color: "#999"
        }),
        m: common_vendor.o(($event) => common_vendor.index.navigateTo({
          url: "/packageB/pages/about/privacypolicy"
        })),
        n: common_vendor.p({
          name: "document-o",
          size: "36rpx",
          color: "#666"
        }),
        o: common_vendor.p({
          name: "arrow",
          size: "28rpx",
          color: "#999"
        }),
        p: common_vendor.o(($event) => common_vendor.index.navigateTo({
          url: "/packageB/pages/about/useragreement"
        })),
        q: common_vendor.t(appInfo.value.description),
        r: common_vendor.t(appInfo.value.copyright)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2eec0291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/packageB/pages/about/about.js.map
