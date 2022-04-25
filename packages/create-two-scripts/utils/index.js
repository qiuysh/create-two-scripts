const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { log } = console;

/**
 *
 * @param {} type inquirer
 */
async function inquirerPrompt(type) {
  return inquirer.prompt(type);
}

function message(key, msg) {
  switch (key) {
    case "success":
      log(`${chalk.hex("#27ae60").bold(msg)}\n`);
      break;
    case "error":
      log(`${chalk.hex("#f44336").bold(msg)}\n`);
      break;
    case "warn":
      log(`${chalk.hex("#ff9800").bold(msg)}\n`);
      break;
    default:
      log(`${chalk.bold(msg)}\n`);
      break;
  }
}

module.exports = {
  program,
  inquirerPrompt,
  message,
};
