import path from "path";
import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import { exec } from "shelljs";
import os from "os";
import { merge } from "webpack-merge";
import { prompt } from "../utils";
import {
  defaultTempData,
  createPackageData,
  installDepData,
} from "../utils/const";
import { PackageProps } from "../typings";

const { argv } = process;

const isDebug: boolean =
  argv[argv.length - 2] === "--debug" || false;

function installDeps(
  sourceDir: string,
  dependencies: string[]
): void {
  if (sourceDir && dependencies.length) {
    const deps = dependencies.join(" ");
    exec(`cd ${sourceDir} && yarn add --dev ${deps}`);
  }
}

function getTemplateDir(
  template: string,
  projectDir: string
): string {
  let templatePath: string | null = null;
  if (isDebug && module) {
    templatePath = module.path.replace(
      path.join("create-two-scripts", "lib", "scripts"),
      template
    );
  } else {
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

function readJsonSync(targetDir: string) {
  return targetDir && fs.readJSONSync(targetDir, "utf-8");
}

/**
 * create project
 * @param projectName 
 */
async function init(projectName: string) {
  const rootDir: string = process.cwd();
  const projectDir: string = path.join(
    rootDir,
    projectName
  );
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
    // package temp
    const initPackage: PackageProps = {
      name,
      version: "1.0.0",
      private: true,
      description,
      author,
      license,
      main: "index.js",
      scripts: {},
      sideEffects: {},
      dependencies: {},
      devDependencies: {},
      husky: {},
      "lint-staged": {},
      config: {},
    };

    const projectPackageDir: string = path.join(
      rootDir,
      projectName,
      "package.json"
    );
    // pre install deps
    const devDeps: string[] = [
      template,
      "create-two-scripts",
    ].filter(devs => isDebug && devs !== template);

    spinner.start();

    setTimeout(() => {
      spinner.color = "#27ae60";
      spinner.text = "Creating...\n";
    }, 1000);

    fs.writeFileSync(
      projectPackageDir,
      JSON.stringify(initPackage, null, 2) + os.EOL
    );

    installDeps(projectDir, devDeps);

    const templateDir: string = getTemplateDir(
      template,
      projectDir
    );

    const initPackageJson: PackageProps = readJsonSync(
      projectPackageDir
    );

    fs.copySync(templateDir, projectDir);

    const templatePackageJson: PackageProps = readJsonSync(
      projectPackageDir
    );
    // merge init and template package
    const projectPackageJson: PackageProps = merge(
      initPackageJson,
      templatePackageJson
    );

    fs.writeFileSync(
      projectPackageDir,
      JSON.stringify(projectPackageJson, null, 2) + os.EOL
    );

    // remove cts template
    if (
      initPackageJson.devDependencies &&
      initPackageJson.devDependencies[template]
    ) {
      exec(`cd ${projectName} && yarn remove ${template}`);
    }

    spinner.succeed(
      chalkStyle(`Success, ${projectName} is created! \n`)
    );

    // install all deps ?
    const { isInstall } = await prompt(installDepData);

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

export = init;
