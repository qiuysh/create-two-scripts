/** @format */

const fs = require("fs-extra");
const ora = require("ora");
const chalk = require("chalk");
const { inquirerPrompt } = require("../util/utils");
const { createTypeData } = require("../util/default"),
  { log } = console;

/**
 * 创建渠道
 * @param {*} type
 * @param {*} name
 * @returns
 */
function createTrunkEnsure(type, name) {
  if (type === "dir") {
    return fs.ensureDir(name);
  }
  return fs.ensureFile(name);
}

/**
 * 创建
 * @param {*} args
 */
async function create(args) {
  const name = args[0],
    inquirerRet = await inquirerPrompt(createTypeData),
    text = inquirerRet.dirType === "dir" ? "夹" : "",
    spinner = ora(`开始创建文件${text}...`).start();

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = `正在创建文件${text}...`;
  }, 1000);

  try {
    const result = await createTrunkEnsure(
      inquirerRet.dirType,
      name,
    );
    if (result) {
      throw result;
    }
    spinner.succeed(
      chalk.green(`创建文件${text}成功！（success）`),
    );
  } catch (err) {
    spinner.stop();
    log(chalk.red(err));
    process.exit();
  }
}

module.exports = create;
