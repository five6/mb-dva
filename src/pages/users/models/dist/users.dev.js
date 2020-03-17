"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = require("@/services/users");

var _authorityService = require("@/services/authorityService");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'user',
  state: {
    list: [],
    currentUser: {}
  },
  effects: {
    queryUsers:
    /*#__PURE__*/
    regeneratorRuntime.mark(function queryUsers(_, _ref) {
      var call, put, response;
      return regeneratorRuntime.wrap(function queryUsers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              call = _ref.call, put = _ref.put;
              _context.next = 3;
              return call(_users.queryUsers);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return put({
                type: 'saveUsers',
                payload: response
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, queryUsers);
    }),
    queryCurrentUser:
    /*#__PURE__*/
    regeneratorRuntime.mark(function queryCurrentUser(_ref2, _ref3) {
      var payload, call, put, response;
      return regeneratorRuntime.wrap(function queryCurrentUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              payload = _ref2.payload;
              call = _ref3.call, put = _ref3.put;
              _context2.next = 4;
              return call(_users.queryCurrentUser, payload);

            case 4:
              response = _context2.sent;
              _context2.next = 7;
              return put({
                type: 'saveCurrentUser',
                payload: response
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, queryCurrentUser);
    })
  },
  reducers: {
    save: function save(state, action) {
      return _objectSpread({}, state, {
        list: action.payload
      });
    },
    saveCurrentUser: function saveCurrentUser(state, action) {
      var user = action.payload;
      return _objectSpread({}, state, {
        currentUser: user || {}
      });
    }
  }
};
exports["default"] = _default;