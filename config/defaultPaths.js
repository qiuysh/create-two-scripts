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
function getUserWebpackConfig() {
  const configFilePath = getReadFilePath("two.config.js");
  if (existsSync(configFilePath)) {
    return require(configFilePath);
  }
  throw "未找到 two.config.js 配置文件！";
}

module.exports = {
  appDist: getReadFilePath("dist"),
  appPublic: getReadFilePath("public"),
  appHtml: getReadFilePath("public/index.html"),
  appConfig: getReadFilePath("public/config"),
  appPackageJson: getReadFilePath("package.json"),
  appSrc: getReadFilePath("src"),
  appTsConfig: getReadFilePath("tsconfig.json"),
  appModules: getReadFilePath("node_modules"),
  appDirectory,
  getUserConf: getUserWebpackConfig,
  getReadFilePath,
};
