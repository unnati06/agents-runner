const fs = require('fs').promises;
const axios = require('axios');
const { substituteParams, getAuthHeaders, mapResponse } = require('./utils');

class AgentsJsonRunner {
  constructor(filePath, credentials = {}) {
    this.filePath = filePath;
    this.credentials = credentials;
    this.spec = null;
  }

  // Load the agents.json file
  async loadSpec() {
    if (!this.spec) {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.spec = JSON.parse(data);
    }
    return this.spec;
  }

  // Run a specific chain
  async runChain(chainId, params) {
    await this.loadSpec();
    const chain = this.spec.chains.find(c => c.id === chainId);
    if (!chain) throw new Error(`Chain '${chainId}' not found`);

    let result = {};
    const baseUrl = this.spec.servers[0].url;

    for (const step of chain.steps) {
      // Prepare request
      const url = `${baseUrl}${substituteParams(step.path, params)}`;
      const method = step.method.toLowerCase();
      const stepParams = Object.fromEntries(
        Object.entries(step.parameters).map(([k, v]) => [k, substituteParams(v, { ...params, ...this.credentials })])
      );
      const headers = getAuthHeaders(step.authentication, this.credentials);

      // Execute API call
      const response = await axios({ method, url, params: stepParams, headers });
      
      // Process response
      if (step.response_mapping) {
        result = {
          formatted_output: mapResponse(response.data, step.response_mapping, params)
        };
      }
    }

    return result;
  }
}

module.exports = AgentsJsonRunner;