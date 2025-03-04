const AgentsJsonRunner = require('./src');

// Example usage with the weather agents.json
async function testRunner() {
  const runner = new AgentsJsonRunner('weather_agents.json', {
    api_key: '022f62c06fc67cf2e5906547efecdf3c'
  });

  try {
    const result = await runner.runChain('get-weather', { city: 'London' });
    console.log(result.formatted_output);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testRunner();