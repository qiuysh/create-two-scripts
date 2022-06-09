import { realpathSync, existsSync } from "fs-extra";
import { resolve, isAbsolute } from "path";

const appDist = getReadFilePath("dist");
const appPublic = getReadFilePath("public");
const appHtml = getReadFilePath("public/index.html");
const appPackageJson = getReadFilePath("package.json");
const appSrc = getReadFilePath("src");
const appModules = getReadFilePath("node_modules");
const appDirectory = realpathSync(process.cwd());

function getReadFilePath(path: string): string {
  return isAbsolute(path)
    ? path
    : resolve(realpathSync(process.cwd()), path);
}

/**
 * get custom webpack config
 * @return {*}
 */
function getUserConf() {
  const configFilePath = getReadFilePath("two.config.js");
  if (existsSync(configFilePath)) {
    return require(configFilePath);
  }
  throw "not found two.config.js";
}

export {
  appDist,
  appPublic,
  appHtml,
  appPackageJson,
  appSrc,
  appModules,
  appDirectory,
  getReadFilePath,
  getUserConf
};
