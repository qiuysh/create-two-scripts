/** @format */

const program = require("commander");
const inquirer = require("inquirer");

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
};
