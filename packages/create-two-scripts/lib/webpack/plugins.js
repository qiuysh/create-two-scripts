"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var esbuild_loader_1 = require("esbuild-loader");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var case_sensitive_paths_webpack_plugin_1 = __importDefault(require("case-sensitive-paths-webpack-plugin"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var defaultPaths_1 = require("../utils/defaultPaths");
function createPlugins(_a) {
    var esbuild = _a.esbuild, hot = _a.hot;
    var cacheOptions = {
        antd: {
            name: "antd",
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            chunks: "initial",
        },
        lodash: {
            name: "lodash",
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            chunks: "initial",
            priority: -10,
        },
        defaultVendors: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|js-cookie)[\\/]/,
            name: "default-vendors",
            chunks: "all",
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
    };
    return [
        new webpack_1.default.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new webpack_1.default.ProgressPlugin(),
        new case_sensitive_paths_webpack_plugin_1.default(),
        new html_webpack_plugin_1.default({
            filename: "index.html",
            template: defaultPaths_1.appHtml,
            title: defaultPaths_1.appPackageJson === null || defaultPaths_1.appPackageJson === void 0 ? void 0 : defaultPaths_1.appPackageJson.name,
            templateParameters: {
                configPath: "config.js",
            },
            inject: "body",
        }),
        new mini_css_extract_plugin_1.default({
            filename: "./styles/[name].[contenthash].css",
            chunkFilename: "./styles/[id].[contenthash].css",
        }),
        new webpack_1.default.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 30000,
            maxSize: 600000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: cacheOptions,
        }),
        esbuild && new esbuild_loader_1.ESBuildPlugin(),
        hot && new react_refresh_webpack_plugin_1.default(),
    ].filter(function (e) { return e; });
}
;
exports.default = createPlugins;
