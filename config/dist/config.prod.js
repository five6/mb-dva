"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=require("../src/utils/utils"),_defaultSettings=require("./defaultSettings"),_default={define:{API_PREFIX:1},theme:{"primary-color":_defaultSettings.primaryColor},routes:(0,_utils.YAML)("".concat(__dirname,"/routes.yaml")),plugins:[["umi-plugin-react",{antd:!0,dva:{hmr:!0},title:"myblog",dll:!1,locale:{enable:!0,default:"en-US",baseNavigator:!1},dynamicImport:{loadingComponent:"./components/PageLoading/index"},routes:{exclude:[/models\//,/services\//,/model\.(t|j)sx?$/,/service\.(t|j)sx?$/,/components\//]}}]],proxy:{"/api/v1/weather":{target:"https://api.seniverse.com/",changeOrigin:!0,pathRewrite:{"^/api/v1/weather":"/v3/weather"}}}};exports.default=_default;