"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsconfig_paths_webpack_plugin_1 = __importDefault(require("tsconfig-paths-webpack-plugin"));
var plugins_1 = __importDefault(require("./plugins"));
var loaders_1 = __importDefault(require("./loaders"));
var optimization_1 = __importDefault(require("./optimization"));
var defaultPaths_1 = require("../utils/defaultPaths");
function webpackConfig(opts) {
    var _a;
    var ts = opts.ts;
    var nodeEnv = process.env.NODE_ENV;
    var isDev = nodeEnv === "development";
    var entry = {
        app: defaultPaths_1.appSrc + "/index",
    };
    var output = {
        path: defaultPaths_1.appDist,
        filename: isDev
            ? "js/[name].js"
            : "js/[name].[contenthash].js",
        chunkFilename: isDev
            ? "js/[id].chunk.js"
            : "js/[id].chunk.[contenthash].js",
        publicPath: "/",
    };
    var loaders = (0, loaders_1.default)(opts);
    var plugins = (0, plugins_1.default)(opts);
    var optimizations = (0, optimization_1.default)(opts);
    var extensions = [
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".css",
        ".less",
        ".scss",
        ".sass",
    ];
    var mode = nodeEnv;
    var webpackBaseConfig = {
        context: defaultPaths_1.appDirectory,
        mode: mode,
        devtool: false,
        entry: entry,
        output: output,
        module: {
            rules: loaders,
        },
        plugins: plugins,
        resolve: {
            modules: ["node_modules"],
            extensions: extensions,
            plugins: [],
        },
        performance: {
            hints: false,
        },
        stats: {
            errorDetails: true,
        },
        optimization: optimizations,
        externals: {},
        node: false,
        target: "web",
        cache: {
            type: "filesystem",
        },
    };
    if (ts) {
        var appTsConfig = (0, defaultPaths_1.getReadFilePath)("tsconfig.json");
        var option = {
            configFile: appTsConfig,
            extensions: extensions,
        };
        var resolve = webpackBaseConfig.resolve;
        var tsconfigPaths = new tsconfig_paths_webpack_plugin_1.default(option);
        (_a = resolve === null || resolve === void 0 ? void 0 : resolve.plugins) === null || _a === void 0 ? void 0 : _a.push(tsconfigPaths);
    }
    return webpackBaseConfig;
}
;
exports.default = webpackConfig;
