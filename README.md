# AI Log Analyzer CLI

## What It Does

A simple CLI tool that analyzes log files and provides a summary of errors and warnings. It helps quickly identify issues without manually scanning large logs.

## Why I Built It

As a backend developer, I often need to go through large log files to find errors. This process is repetitive and time-consuming. This tool automates that process and provides quick insights.

## Tech Stack

* Node.js
* Chalk (for terminal styling)
* File system (fs module)

## How to Run

1. Clone the repository:
   git clone <your-repo-link>
   cd ai-log-analyzer

2. Install dependencies:
   npm install

3. Run the tool:
   node index.js logs.txt

## AI Tools Used

* ChatGPT (for generating initial code and guidance)

## What AI Got Right

* Generated the initial CLI structure
* Suggested logic for parsing logs (ERROR/WARN detection)
* Helped scaffold the project quickly

## What I Had to Fix

* Chalk import issue (`chalk.blue is not a function`) due to ESM vs CommonJS conflict
  Fixed by updating import:
  const chalk = require("chalk").default;

* Minor adjustments in log parsing logic

## What I Learned About Vibe Coding

* AI can speed up initial setup significantly
* Reviewing and debugging AI-generated code is essential
* Small, iterative steps work better than generating everything at once

## Screenshots / Demo

(Add later if needed)
