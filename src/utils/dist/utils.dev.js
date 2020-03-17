"use strict";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
var fs = require('fs');

var yaml = require('js-yaml');

var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

function isUrl(path) {
  return reg.test(path);
}

function YAML(f) {
  var yamlContent = fs.readFileSync(f).toString();
  return yaml.load(yamlContent);
}

module.exports = {
  isUrl: isUrl,
  YAML: YAML
};