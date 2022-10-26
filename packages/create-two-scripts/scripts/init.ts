import path from "path";
import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import { exec } from "shelljs";
import os from "os";
import { merge } from "webpack-merge";
import { prompt, readJsonSync, message } from "../utils";
import {
  defaultTempData,
  createPackageData,
  installDepData,
} from "../utils/const";
import { PackageProps } from "../typings";

const { argv } = process;

const isDebug: boolean = argv.includes("--debug") || false;

function installDeps(
  sourceDir: string,
  dependencies: string[]
): void {
  if (sourceDir && dependencies.length) {
    const deps = dependencies.join(" ");
    message('success', 'install pre dev dependencies' )
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

function checkPorjectName(projectName) {
  const [, , opt, , name] = argv;
  try {
    if (opt === "init" && name && projectName !== name) {
      throw "Please, checked you init options and project name position!";
    }
  } catch (err: any) {
    message("error", err);
    process.exit(500);
  }
}

/**
 * create project
 * @param projectName
 */
async function init(projectName: string) {
  checkPorjectName(projectName);
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
    // package template
    const templatePackage: PackageProps = {
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
    const preDevDeps: string[] = [
      template,
      "create-two-scripts",
    ].filter(devs => (isDebug && devs !== template) || (!isDebug && devs));

    spinner.start();

    setTimeout(() => {
      spinner.color = "#27ae60";
      spinner.text = "Creating...\n";
    }, 1000);

    fs.writeFileSync(
      projectPackageDir,
      JSON.stringify(templatePackage, null, 2) + os.EOL
    );

    installDeps(projectDir, preDevDeps);

    const templateDir: string = getTemplateDir(
      template,
      projectDir
    );

    const initPackageJson: PackageProps = readJsonSync(
      projectPackageDir
    );

    fs.copySync(templateDir, projectDir);

    const packageFromTemplate: PackageProps = readJsonSync(
      projectPackageDir
    );
    // merge init and template package
    const projectPackageToMergeJson: PackageProps = merge(
      initPackageJson,
      packageFromTemplate
    );

    fs.writeFileSync(
      projectPackageDir,
      JSON.stringify(projectPackageToMergeJson, null, 2) +
        os.EOL
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
