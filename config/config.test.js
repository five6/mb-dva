
// ref: https://umijs.org/config/

import { YAML } from '../src/utils/utils';
import { primaryColor } from './defaultSettings';

export default {
  define: {
    'process.env.API_PREFIX': 'api/test',
  },
  theme: {
    'primary-color': primaryColor,
  },
  routes:  YAML(`${__dirname}/routes.yaml`),
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr: true,
      },
      title: 'myblog',
      dll: false,
      locale: {
        enable: true, // default false
        default: 'en-US', // default zh-CN
        baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  // proxy: {
  //   '/api/v1/users': {
  //     target: 'https://api.seniverse.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/v1/weather': '/v3/weather' },
  //   },
  // },
}