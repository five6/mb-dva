"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../src/utils/utils");

var _defaultSettings = require("./defaultSettings");

// ref: https://umijs.org/config/
var _default = {
  define: {
    API_PREFIX: 1
  },
  theme: {
    'primary-color': _defaultSettings.primaryColor
  },
  routes: (0, _utils.YAML)("".concat(__dirname, "/routes.yaml")),
  plugins: [// ref: https://umijs.org/plugin/umi-plugin-react.html
  ['umi-plugin-react', {
    antd: true,
    dva: {
      hmr: true
    },
    title: 'myblog',
    dll: false,
    locale: {
      enable: true,
      // default false
      "default": 'en-US',
      // default zh-CN
      baseNavigator: false // default true, when it is true, will use `navigator.language` overwrite default

    },
    dynamicImport: {
      loadingComponent: './components/PageLoading/index'
    },
    routes: {
      exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//]
    }
  }]],
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/v1/weather': '/v3/weather'
      }
    }
  }
};
exports["default"] = _default;