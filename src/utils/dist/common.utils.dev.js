"use strict";

var _locale = require("umi-plugin-react/locale");

var _authority = require("@/utils/authority");

module.exports = {
  getRosMessageByCode: function getRosMessageByCode(data) {
    var lang = (0, _locale.getLocale)() || 'en-US';
    var messageList = (0, _authority.getRosMessage)();
    var code = data.code;
    var message = messageList ? messageList[code] ? messageList[code][lang] : '' : '';

    if (message) {
      return {
        message: message,
        description: "".concat(message, "(").concat(data.code, ")")
      };
    }

    return {
      message: "".concat(data.msg, "(").concat(data.code, ")"),
      description: ''
    };
  }
};