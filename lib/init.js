const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs-extra");
const shell = require("shelljs");
const handlebars = require("handlebars");
const { inquirerPrompt } = require("../utils");
const {
  createTypeData,
  installTypeData,
} = require("../utils/default");

function initPromptData(name) {
  createTypeData[0].default = name;
  return createTypeData;
}

/**
 * create project
 * @param {*} args
 */
async function init(name) {
  const projectName = name;
  const createPrompt = initPromptData(projectName);
  const initPrompt = await inquirerPrompt(createPrompt);
  const spinner = ora("initializing the project...\n");
  try {
    if (fs.existsSync(projectName)) {
      throw `waring, ${projectName} already exists`;
    }

    spinner.start();

    setTimeout(() => {
      spinner.color = "#27ae60";
      spinner.text = "creating...\n";
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
        .bold(`success, ${projectName} is created!\n`)
    );

    const { isInstall } = await inquirerPrompt(
      installTypeData
    );

    if (
      isInstall &&
      shell.exec(`cd ${projectName} && yarn`).code != 0
    ) {
      throw "fail, install dependencies!";
    }

    spinner.succeed(
      chalk
        .hex("#27ae60")
        .bold(
          `done, you can run 'yarn start' command to start ${projectName}. \n`
        )
    );
  } catch (err) {
    spinner.fail(chalk.red(err));
    spinner.stop();
    process.exit(500);
  }
}

module.exports = init;
