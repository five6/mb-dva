"use strict";

var fs = require('fs');

var path = require('path');

var lessToJs = require('less-vars-to-js');

module.exports = function () {
  var themePath = path.join(__dirname, '../src/themes/default.less');
  return lessToJs(fs.readFileSync(themePath, 'utf8'));
};