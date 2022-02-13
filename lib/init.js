/** @format */

const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs-extra");
const shell = require("shelljs");
const handlebars = require("handlebars");
const { inquirerPrompt } = require("../util/utils");
const {
    createTypeData,
    installTypeData,
  } = require("../util/default"),
  { log } = console;

function initPromptData(name) {
  createTypeData[0].default = name;
  return createTypeData;
}

/**
 * 初始化工程
 * @param {*} args
 */
async function init(args) {
  // 工程名称
  const projectName = args[0],
    createPrompt = initPromptData(projectName),
    initPrompt = await inquirerPrompt(createPrompt),
    spinner = ora(
      "正在初始化项目，请稍等（Initializing, please wait）...\n",
    ).start();

  setTimeout(() => {
    spinner.color = "green";
    spinner.text = "项目初始化中...\n";
  }, 2000);

  try {
    await fs.copy(
      path.join(__dirname, "..", "template"),
      projectName,
    );

    const packagePath = `${projectName}/package.json`,
      packageContent = fs.readFileSync(
        packagePath,
        "utf-8",
      ),
      packageResult =
        handlebars.compile(packageContent)(initPrompt);
    fs.writeFileSync(packagePath, packageResult);

    spinner.succeed(chalk.green("已完成下载！\n"));

    const { installType } = await inquirerPrompt(
      installTypeData,
    );

    if (installType) {
      shell.exec(`cd ${projectName} && yarn`);
      setTimeout(() => {
        spinner.color = "green";
        spinner.text = "开始安装依赖...\n";
      }, 2000);
    }

    spinner.succeed(
      chalk.green("初始化成功！（success）\n"),
    );
  } catch (err) {
    spinner.stop();
    log(chalk.red(err));
    process.exit();
  }
}

module.exports = init;
