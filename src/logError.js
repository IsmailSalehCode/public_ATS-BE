const fs = require("fs");
const path = require("path");

function logError(error) {
  const logFilePath = path.join(__dirname, "../logs/error.log");
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${error}\nStack: ${error.stack}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

module.exports = logError;
