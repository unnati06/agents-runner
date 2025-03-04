A lightweight, generic runner for agents.json files, built in JavaScript (Node.js). This tool loads and executes any valid agents.json file, making API calls and processing responses as defined, with a simple CLI for ease of use.
 This is a functional prototype

Features
Generic Parsing: Works with any agents.json file following the OpenAPI-based spec (e.g., chains, steps, servers).

Dynamic Execution: Executes HTTP requests (any method) with parameter substitution and response mapping.

CLI Interface: Run it from the terminal with flexible options (e.g., node cli.js --file weather_agents.json --chain get-weather --api-key <key> city=London).

Authentication: Supports Bearer and ApiKey auth types.

Response Processing: Maps JSON responses using jsonpath and formats output dynamically.

Installation
Clone the Repository:
bash

git clone https://github.com/[your-username]/generic-runner.git
cd generic-runner

Install Dependencies:
bash

npm install

Usage
Command Line
Run an agents.json file via the CLI:
bash

node cli.js --file <path> --chain <chain-id> --api-key <key> [params...]

Example: OpenWeatherMap
With weather_agents.json (included in the repo):
node cli.js --file weather_agents.json --chain get-weather --api-key your-openweathermap-key city=London

How It Works
AgentsJsonRunner: 
Loads an agents.json file.

Executes specified chains by making HTTP requests (axios) based on steps.

Substitutes parameters (e.g., {city} → London) and maps responses (e.g., $.main.temp → formatted string).

CLI: Parses options with commander, validates inputs, and runs the core logic.


