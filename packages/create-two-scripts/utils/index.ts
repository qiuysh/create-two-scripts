import program from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";

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

function readJsonSync(targetDir: string) {
  return targetDir && fs.readJSONSync(targetDir, "utf-8");
}


export {
  program,
  prompt,
  message,
  readJsonSync,
  error,
  warn,
  info,
};
