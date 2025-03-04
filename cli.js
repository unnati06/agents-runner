#!/usr/bin/env node

const { program } = require('commander');
const AgentsJsonRunner = require('./src');

// Define CLI options
program
  .option('--file <path>', 'Path to the agents.json file', 'weather_agents.json')
  .option('--chain <id>', 'Chain ID to run', 'get-weather')
  .option('--city <city>', 'City parameter for the chain')
  .option('--api-key <key>', 'API key for authentication');

// Parse arguments
program.parse(process.argv);

const options = program.opts();

// Main CLI logic
async function runCli() {
  // Build credentials and params from CLI options
  const credentials = { api_key: options.apiKey };
  const params = options.city ? { city: options.city } : {};

  // Validate required options
  if (!options.apiKey) {
    console.error('Error: --api-key is required');
    process.exit(1);
  }
  if (!options.city) {
    console.error('Error: --city is required for this chain');
    process.exit(1);
  }

  // Initialize runner
  const runner = new AgentsJsonRunner(options.file, credentials);

  try {
    const result = await runner.runChain(options.chain, params);
    console.log(result.formatted_output);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute
runCli();