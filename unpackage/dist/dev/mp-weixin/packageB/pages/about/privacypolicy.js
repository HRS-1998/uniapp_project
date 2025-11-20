"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  NavigationBar();
}
const NavigationBar = () => "../../../components/navigation-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "privacypolicy",
  setup(__props) {
    const content = common_vendor.ref([
      {
        title: "隐私政策",
        text: "本隐私政策描述了我们如何收集、使用和保护您的个人信息。请仔细阅读本政策，了解我们的做法。"
      },
      {
        title: "1. 信息收集",
        text: "我们可能收集您的基本个人信息，如姓名、联系方式、位置信息等。这些信息仅用于提供服务和改进用户体验。"
      },
      {
        title: "2. 信息使用",
        text: "我们使用收集的信息来提供、维护和改进我们的服务，开发新功能，并保护用户安全。"
      },
      {
        title: "3. 信息共享",
        text: "我们不会在未经您同意的情况下向第三方共享您的个人信息，除非法律要求或为保护我们的权利。"
      },
      {
        title: "4. 数据安全",
        text: "我们采取合理措施保护您的个人信息免受未授权访问或披露。"
      },
      {
        title: "5. 政策更新",
        text: "我们可能会不时更新本隐私政策，并在应用内通知您重要变更。"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "隐私政策",
          back: true,
          color: "black",
          background: "#FFF"
        }),
        b: common_vendor.f(content.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.title
          }, item.title ? {
            b: common_vendor.t(item.title)
          } : {}, {
            c: item.text
          }, item.text ? {
            d: common_vendor.t(item.text)
          } : {}, {
            e: index
          });
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0040dad9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/packageB/pages/about/privacypolicy.js.map
