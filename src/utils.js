const jsonpath = require('jsonpath');

function substituteParams(template, params) {
  return Object.keys(params).reduce((str, key) => {
    return str.replace(`{${key}}`, params[key]);
  }, template);
}

function getAuthHeaders(authConfig, credentials) {
  if (!authConfig) return {};
  const key = authConfig.key.replace(/[{}]/g, ''); // Remove { and }
  if (authConfig.type === 'Bearer') {
    return { Authorization: `Bearer ${credentials[key]}` };
  } else if (authConfig.type === 'ApiKey') {
    return { [authConfig.header || 'X-API-Key']: credentials[key] };
  }
  return {};
}

// this extracts and format response data
function mapResponse(responseData, mapping, params) {
  const value = jsonpath.query(responseData, mapping.output)[0];
  return substituteParams(mapping.format, { ...params, output: value });
}

module.exports = { substituteParams, getAuthHeaders, mapResponse };