const { realpathSync } = require('fs-extra');
const { resolve, isAbsolute } = require('path');
const webpack = require("webpack");
const fs = require("fs-extra");


const appDirectory = realpathSync(process.cwd());

function getReadFilePath(path) {
  return isAbsolute(path) ? path : resolve(appDirectory(), path);
}

/**
 * 获取自定义配置
 * @return {*} 
 */
function getCustomConfig() {
  let curFilePath = getReadFilePath('.wolinrc.js');
  console.log(curFilePath, 'curFilePath', fs.existsSync(curFilePath))
  if (fs.existsSync(curFilePath)) {
    return require('.wolinrc.js');
  } else {
    return webpack;
  }
}

module.exports = {
  appBuild: getReadFilePath('build'),
  appDist: getReadFilePath('dist'),
  appPublic: getReadFilePath('public'),
  appHtml: getReadFilePath('public/index.html'),
  appConfig: getReadFilePath('public/config'),
  appPackageJson: getReadFilePath('package.json'),
  appSrc: getReadFilePath('src'),
  appTsConfig: getReadFilePath('tsconfig.json'),
  appModules: getReadFilePath('node_modules'),
  appUserConf: getCustomConfig(),
  getReadFilePath,
  appDirectory,
};
