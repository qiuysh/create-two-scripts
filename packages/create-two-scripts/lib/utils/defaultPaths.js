"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConf = exports.getReadFilePath = exports.appDirectory = exports.appModules = exports.appSrc = exports.appPackageJson = exports.appConfig = exports.appHtml = exports.appPublic = exports.appDist = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var appDist = getReadFilePath("dist");
exports.appDist = appDist;
var appPublic = getReadFilePath("public");
exports.appPublic = appPublic;
var appHtml = getReadFilePath("public/index.html");
exports.appHtml = appHtml;
var appConfig = getReadFilePath("public/config");
exports.appConfig = appConfig;
var appPackageJson = getReadFilePath("package.json");
exports.appPackageJson = appPackageJson;
var appSrc = getReadFilePath("src");
exports.appSrc = appSrc;
var appModules = getReadFilePath("node_modules");
exports.appModules = appModules;
var appDirectory = getReadFilePath("node_modules");
exports.appDirectory = appDirectory;
function getReadFilePath(path) {
    return (0, path_1.isAbsolute)(path)
        ? path
        : (0, path_1.resolve)((0, fs_extra_1.realpathSync)(process.cwd()), path);
}
exports.getReadFilePath = getReadFilePath;
function getUserConf() {
    var configFilePath = getReadFilePath("two.config.js");
    if ((0, fs_extra_1.existsSync)(configFilePath)) {
        return require(configFilePath);
    }
    throw "not found two.config.js";
}
exports.getUserConf = getUserConf;
