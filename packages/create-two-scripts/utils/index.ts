import program from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

const { log, error, warn, info } = console;

/**
 *
 * @param {} type inquirer
 */
async function prompt(type) {
  return inquirer.prompt(type);
}

function message(key: string, msg: unknown) {
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

function parseBoolean(param: string): boolean {
  return param && typeof param === "string"
    ? param.toLowerCase() == "true"
    : false;
}

export {
  program,
  prompt,
  message,
  parseBoolean,
  error,
  warn,
  info,
};
