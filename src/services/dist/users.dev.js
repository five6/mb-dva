"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryUsers = queryUsers;
exports.queryCurrentUser = queryCurrentUser;

var _request = _interopRequireDefault(require("../../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function queryUsers() {
  return regeneratorRuntime.async(function queryUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _request["default"])("".concat(API_PREFIX, "/users"), {
            method: 'GET',
            headers: {
              Accept: "application/json"
            }
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function queryCurrentUser(id) {
  return regeneratorRuntime.async(function queryCurrentUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _request["default"])("".concat(API_PREFIX, "/users/").concat(id), {
            method: 'GET',
            headers: {
              Accept: "application/json"
            }
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}