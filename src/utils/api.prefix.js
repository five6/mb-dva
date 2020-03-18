
const packageJson = require('../../package.json');
const { API_PREFIX } = process.env;


module.exports = {
  apiPrefix: API_PREFIX,
  SYSTEM_VERSION: packageJson.version,
}