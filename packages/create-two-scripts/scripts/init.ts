import path from "path";
import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import { exec } from "shelljs";
import os from "os";
import { prompt } from "../utils";
import {
  defaultTempData,
  createPackageData,
  installDependenciesData,
} from "../utils/iMessage";

import { PackageProps } from "../typings";

function getTemplateDir(
  template: string,
  projectDir: string
): string {
  let templatePath: string | null = null;
  const type: string[] = ["-d", "--debug"];
  const { argv } = process;
  const debug: boolean =
    argv.length === 5
      ? type.includes(argv[argv.length - 2])
      : false;
  if (debug && module) {
    templatePath = module.path.replace(
      "create-two-scripts/scripts",
      template
    );
  } else {
    exec(`cd ${projectDir}`);
    exec(`yarn add ${template}`);
    templatePath = path.join(
      projectDir,
      "node_modules",
      template
    );
  }
  return path.join(templatePath, "template");
}

function chalkStyle(params: string) {
  return chalk.hex("#27ae60").bold(params);
}

/**
 * create project
 * @param {*} args
 */
async function init(name: string) {
  const projectName: string = name;
  const rootDir: string = process.cwd();
  const projectDir = `${rootDir}/${projectName}`;
  const spinner: any = ora("Initializing the project...\n");

  try {
    if (fs.existsSync(projectName)) {
      throw `Waring, ${projectName} already exists`;
    }
    fs.mkdirs(projectName);
    // choose template
    const { template } = await prompt(defaultTempData);

    const {
      name = projectName,
      description,
      author,
      license = "MIT",
    } = await prompt(createPackageData);

    const initPackageJson: PackageProps = {
      name,
      version: "1.0.0",
      private: true,
      description,
      author,
      license,
      dependencies: {},
    };

    spinner.start();

    setTimeout(() => {
      spinner.color = "#27ae60";
      spinner.text = "Creating...\n";
    }, 1000);

    fs.writeFileSync(
      path.join(projectDir, "package.json"),
      JSON.stringify(initPackageJson, null, 2) + os.EOL
    );

    const templateDir: string = getTemplateDir(
      template,
      projectDir
    );

    fs.copySync(templateDir, projectDir);

    const templatePackageJson: PackageProps =
      fs.readJSONSync(
        projectDir + "/package.json",
        "utf-8"
      );

    const projectPackageJson: PackageProps = {
      ...initPackageJson,
      ...templatePackageJson,
    };

    fs.writeFileSync(
      path.join(rootDir, projectName, "package.json"),
      JSON.stringify(projectPackageJson, null, 2) + os.EOL
    );

    // remove cts template
    if (
      initPackageJson.dependencies &&
      initPackageJson.dependencies[template]
    ) {
      exec(`cd ${projectName} && yarn remove ${template}`);
    }

    spinner.succeed(
      chalkStyle(`Success, ${projectName} is created! \n`)
    );

    const { isInstall } = await prompt(
      installDependenciesData
    );

    if (
      isInstall &&
      exec(`cd ${projectName} && yarn`).code != 0
    ) {
      throw "Fail, install dependencies!";
    }

    spinner.succeed(
      chalkStyle(
        `Done, you can run 'yarn start' to start ${projectName}. \n`
      )
    );
  } catch (err) {
    spinner.fail(chalk.red(err));
    spinner.stop();
    process.exit(500);
  }
}

export default init;
