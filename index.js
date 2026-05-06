#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk").default;

const filePath = process.argv[2];

if (!filePath) {
  console.log(chalk.red("❌ Please provide a log file path"));
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.log(chalk.red("❌ File not found"));
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf-8");
const lines = content.split("\n");

const errors = lines.filter(line => line.includes("ERROR"));
const warnings = lines.filter(line => line.includes("WARN"));

// Count frequency of each error
const errorCount = {};

errors.forEach(line => {
  // Remove "ERROR" keyword and trim
  const cleanError = line.replace("ERROR", "").trim();

  errorCount[cleanError] = (errorCount[cleanError] || 0) + 1;
});

// Find most frequent error
let topError = null;
let maxCount = 0;

for (const err in errorCount) {
  if (errorCount[err] > maxCount) {
    maxCount = errorCount[err];
    topError = err;
  }
}

async function analyzeWithAI(errorSummary, warningSummary) {
  const prompt = `You are an expert system administrator and developer. Analyze the following log summaries and provide:
1. Top Issues: A concise list of the main problems.
2. Root Cause Hints: Why these errors might be happening.
3. Suggested Fixes: Step-by-step instructions to solve them.

Log Summary:
Errors:
${errorSummary}

Warnings:
${warningSummary}

Please be concise and technical.`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma4:31b-cloud",
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (err) {
    return `❌ AI Analysis failed: ${err.message}. Make sure Ollama is running.`;
  }
}

async function main() {
  console.log(chalk.blue("\n📊 Log Summary"));
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (topError) {
    console.log(chalk.yellow(`\n🔥 Top Error:`));
    console.log(`${topError} (${maxCount} times)`);
  }

  if (errors.length > 0 || warnings.length > 0) {
    console.log(chalk.magenta("\n🤖 AI Analysis..."));

    // Create a summary string for the AI
    const errorSummary = Object.entries(errorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5) // Top 5 errors
      .map(([err, count]) => `${err} (${count} times)`)
      .join("\n");

    const warningSummary = warnings.slice(0, 5).join("\n");

    const analysis = await analyzeWithAI(errorSummary, warningSummary);
    console.log(`\n${analysis}`);

    // Save analysis to file
    try {
      fs.writeFileSync("analysis_report.md", analysis, "utf-8");
      console.log(chalk.green("\n💾 Analysis saved to analysis_report.md"));
    } catch (err) {
      console.log(chalk.red(`\n❌ Failed to save analysis: ${err.message}`));
    }
  } else {
    console.log(chalk.green("\n✅ No errors or warnings found. System is healthy!"));
  }
}

main();
