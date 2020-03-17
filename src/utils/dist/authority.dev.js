"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRosMessage = getRosMessage;
var code = 'X-MESSAGE-RESPONSE-CODE';

function getRosMessage(str) {
  var messageString = typeof str === 'undefined' ? localStorage.getItem("".concat(code)) : localStorage.getItem(str);
  var message;

  try {
    message = JSON.parse(messageString);
  } catch (e) {
    message = messageString;
  }

  return message;
}