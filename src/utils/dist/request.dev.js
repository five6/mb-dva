"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("@/utils/common.utils");

var _authorityService = require("@/services/authorityService");

var _locale = require("umi/locale");

var _umiRequest = require("umi-request");

var _antd = require("antd");

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
var codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
/**
 * 异常处理程序
 */

var errorHandler = function errorHandler(error) {
  var _ref = error || {},
      _ref$response = _ref.response,
      response = _ref$response === void 0 ? {} : _ref$response,
      data = _ref.data;

  var errortext = codeMessage[response.status] || response.statusText;
  var status = response.status,
      url = response.url; // TODO 当错误信息是401的时候，跳转到GEEELY SSO服务器登录

  if (status === 401) {
    if (AUTHORITY_LOGIN) {
      setAuthority('');
      window.location.href = '/user/login';
    } else if (AUTHORITY_SSO) {
      window.open(SSO_PREFIX_GEELY, '_self');
    }
  }

  if (!data.code) {
    _antd.notification.error({
      message: "".concat((0, _locale.formatMessage)({
        id: 'app.request.error'
      }), " ").concat(status, ": ").concat(url),
      description: errortext
    });
  } else _antd.notification.error((0, _common.getRosMessageByCode)(data));
};
/**
 * 配置request请求时的默认参数
 */


var request = (0, _umiRequest.extend)({
  errorHandler: errorHandler,
  // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie

}); // request interceptor, change url or options.
// this location for set url
// TODO 根据业务需求添加验证签名。20190729

request.interceptors.request.use(function (url, options) {
  var headers = options.headers;
  headers['Authorization'] = (0, _authorityService.getToken)();
  ;
  return {
    url: url,
    options: options,
    headers: headers
  };
});
var _default = request;
exports["default"] = _default;