const program = require("commander");
const inquirer = require("inquirer");
const { log, info, error } = console;

/**
 * 
 * @param {} type inquirer
 */
async function inquirerPrompt(type) {
  return inquirer.prompt(type);
}

module.exports = {
  program,
  inquirerPrompt,
  log,
  info,
  error,
};
