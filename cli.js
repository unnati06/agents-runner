
const { program } = require('commander');
const AgentsJsonRunner = require('./src');

program
  .option('--file <path>', 'Path to the agents.json file', 'weather_agents.json')
  .option('--chain <id>', 'Chain ID to run', 'get-weather')
  .option('--city <city>', 'City parameter for the chain')
  .option('--api-key <key>', 'API key for authentication');


program.parse(process.argv);

const options = program.opts();


async function runCli() {
 
  const credentials = { api_key: options.apiKey };
  const params = options.city ? { city: options.city } : {};

 
  if (!options.apiKey) {
    console.error('Error: --api-key is required');
    process.exit(1);
  }
  if (!options.city) {
    console.error('Error: --city is required for this chain');
    process.exit(1);
  }

  
  const runner = new AgentsJsonRunner(options.file, credentials);

  try {
    const result = await runner.runChain(options.chain, params);
    console.log(result.formatted_output);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// exec
runCli();