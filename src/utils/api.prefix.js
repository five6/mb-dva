
const packageJson = require('../../package.json');
const { API_PREFIX } = process.env;


module.exports = {
  common_file_url: 'http://localhost:7000/api/v1/files/{id}',
  apiPrefix: API_PREFIX,
  SYSTEM_VERSION: packageJson.version,
}