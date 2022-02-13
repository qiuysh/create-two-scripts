/** @format */

const { realpathSync, existsSync } = require("fs-extra");
const { resolve, isAbsolute } = require("path"),
  appDirectory = realpathSync(process.cwd());

function getReadFilePath(path) {
  return isAbsolute(path)
    ? path
    : resolve(appDirectory, path);
}

/**
 * 获取自定义配置
 * @return {*}
 */
function getCustomConfig() {
  const curFilePath = getReadFilePath(".wolinrc.js");
  if (existsSync(curFilePath)) {
    return require(curFilePath);
  }
  throw new Error("未找到.wolinrc.js配置文件！");
}

module.exports = {
  appBuild: getReadFilePath("build"),
  appDist: getReadFilePath("dist"),
  appPublic: getReadFilePath("public"),
  appHtml: getReadFilePath("public/index.html"),
  appConfig: getReadFilePath("public/config"),
  appPackageJson: getReadFilePath("package.json"),
  appSrc: getReadFilePath("src"),
  appTsConfig: getReadFilePath("tsconfig.json"),
  appModules: getReadFilePath("node_modules"),
  getUserConf: getCustomConfig,
  getReadFilePath,
  appDirectory,
};
