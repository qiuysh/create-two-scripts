const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs-extra");
const shell = require("shelljs");
const handlebars = require("handlebars");
const { inquirerPrompt, log } = require("../utils");
const {
  createTypeData,
  installTypeData,
} = require("../utils/default");

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
  const projectName = args[0];
  const createPrompt = initPromptData(projectName);
  const initPrompt = await inquirerPrompt(createPrompt);
  const spinner = ora("Initializing, 正在初始化项目...\n");
  try {
    if (fs.existsSync(projectName)) {
      throw `项目${projectName} 已存在！`;
    }

    spinner.start();

    setTimeout(() => {
      spinner.color = "#27ae60";
      spinner.text = "创建中...\n";
    }, 1000);

    await fs.copy(
      path.join(__dirname, "..", "template"),
      projectName
    );

    const packagePath = `${projectName}/package.json`;
    const packageContent = fs.readFileSync(
      packagePath,
      "utf-8"
    );
    const packageResult =
      handlebars.compile(packageContent)(initPrompt);
    fs.writeFileSync(packagePath, packageResult);

    spinner.succeed(
      chalk
        .hex("#27ae60")
        .bold(`Success, ${projectName} 已创建！\n`)
    );

    const { installType } = await inquirerPrompt(
      installTypeData
    );

    if (
      installType &&
      shell.exec(`cd ${projectName} && yarn`).code != 0
    ) {
      throw "安装依赖失败！";
    }

    spinner.succeed(
      chalk.hex("#27ae60").bold("Done，初始化成功！\n")
    );
  } catch (err) {
    spinner.fail(chalk.red(err));
    spinner.stop();
    process.exit(500);
  }
}

module.exports = init;
