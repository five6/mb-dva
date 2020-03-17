"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.queryCurrent = queryCurrent;
exports.queryNotices = queryNotices;
exports.getCaptcha = getCaptcha;
exports.login = login;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function query() {
  return regeneratorRuntime.async(function query$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _request["default"])('/api/users'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function queryCurrent() {
  return regeneratorRuntime.async(function queryCurrent$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _request["default"])('/api/currentUser'));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function queryNotices() {
  return regeneratorRuntime.async(function queryNotices$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _request["default"])('/api/notices'));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getCaptcha() {
  return regeneratorRuntime.async(function getCaptcha$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", (0, _request["default"])('/api/notices'));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function login(params) {
  return regeneratorRuntime.async(function login$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", (0, _request["default"])('/api/login', {
            method: 'POST',
            data: params
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}