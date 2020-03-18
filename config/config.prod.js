
// ref: https://umijs.org/config/

import { YAML } from '../src/utils/utils';
import { primaryColor } from './defaultSettings';


export default {
  define: {
    'process.env.API_PREFIX': 'api/prod',
  },
  theme: {
    'primary-color': primaryColor,
  },
  routes:  YAML(`${__dirname}/routes.yaml`),
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'myblog',
      dll: false,
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
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
  },
}
