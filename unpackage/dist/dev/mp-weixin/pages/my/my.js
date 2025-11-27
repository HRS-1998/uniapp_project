"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  _easycom_u_image2();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (NavigationBar + _easycom_u_image)();
}
const NavigationBar = () => "../../components/navigation-bar.js";
const _sfc_main = {
  __name: "my",
  setup(__props) {
    common_vendor.ref("my");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "我的",
          back: false,
          color: "black",
          background: "#FFF"
        }),
        b: common_vendor.p({
          width: "100%",
          height: "300",
          src: "https://innerstatic.tcy365.com/static/tcy365-rpashop/assets/img/top-bg.38856a6a.png"
        }),
        c: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
