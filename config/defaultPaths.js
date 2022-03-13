const { realpathSync, existsSync } = require("fs-extra");
const { resolve, isAbsolute } = require("path");

function getReadFilePath(path) {
  return isAbsolute(path)
    ? path
    : resolve(realpathSync(process.cwd()), path);
}

/**
 * get custom webpack config
 * @return {*}
 */
function getUserWebpackConfig() {
  const configFilePath = getReadFilePath("two.config.js");
  if (existsSync(configFilePath)) {
    return require(configFilePath);
  }
  throw "not found two.config.js";
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
  appDirectory: realpathSync(process.cwd()),
  getUserConf: getUserWebpackConfig,
  getReadFilePath,
};
