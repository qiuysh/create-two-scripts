const program = require("commander");
const inquirer = require("inquirer");
const { log, info, error } = console;

/**
 * 交互框
 * @param {} type inquirer类型
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
