# 🤖 AI Log Analyzer CLI

An intelligent command-line utility designed to automate the tedious process of scanning large log files. This tool identifies critical errors and warnings, aggregates the most frequent issues, and leverages a local LLM via Ollama to provide actionable root-cause analysis and suggested fixes.

## 🚀 Features

- **Rapid Pattern Detection**: Instantly filters for `ERROR` and `WARN` keywords across large datasets.
- **Frequency Analysis**: Identifies and highlights the most frequent errors to pinpoint systemic issues.
- **AI-Powered Diagnostics**: Integrates with Ollama (using `gemma4:31b-cloud`) to generate technical summaries, root cause hints, and step-by-step resolution guides.
- **Automated Reporting**: Automatically exports AI analysis to `analysis_report.md` for persistent documentation.
- **Colored Terminal Output**: Utilizes `chalk` for clear, visual differentiation of log levels and status updates.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **AI Engine**: Ollama (Local LLM Integration)
- **Model**: `gemma4:31b-cloud`
- **Styling**: `chalk` for enhanced CLI observability

## 📦 Installation & Usage

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [Ollama](https://ollama.com/) installed and running locally with the `gemma4:31b-cloud` model pulled.

### Setup
1. **Clone the repository**:
   ```bash
   git clone <https://github.com/santuduttacc/ai-log-analyzer.git>
   cd ai-log-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Tool
Execute the script by passing the path to your log file as an argument:
```bash
node index.js path/to/your/logs.txt
```

## 🧠 Development Insights & Technical Hurdles

### Implementation Challenges
- **Module System Conflict**: Encountered a significant hurdle with `chalk` due to the transition between CommonJS and ECMAScript Modules (ESM). The initial AI-generated code caused runtime errors (`chalk.blue is not a function`). This was resolved by explicitly accessing the `.default` export: `require("chalk").default`.
- **Token Management**: To avoid overloading the LLM context window with massive log files, the tool implements a **Summary-First approach**. Instead of sending raw logs, it aggregates the top 5 most frequent errors and warnings, ensuring the AI receives high-density, relevant information.

### Suggestions for Future LLM/Agent Iterations
For future models or developers extending this tool, consider the following enhancements:
- **Regex-Based Parsing**: Replace simple `.includes()` checks with configurable regular expressions to support multiple log formats (e.g., JSON logs, Syslog).
- **Streaming Analysis**: Implement `fs.createReadStream` for very large log files (GBs) to prevent `readFileSync` from exceeding the Node.js heap memory limit.
- **Contextual Windowing**: Instead of just top errors, include 2-3 lines of context (surrounding logs) for each error to give the AI more situational awareness.

## 📝 License
[MIT](LICENSE)
nce

## Screenshots / Demo

(Add later if needed)
