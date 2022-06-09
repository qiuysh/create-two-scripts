"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var esbuild_loader_1 = require("esbuild-loader");
function optimization(opts) {
    var esbuild = opts.esbuild;
    var defaultMinimizer = [];
    if (esbuild) {
        var esBuildMinify = new esbuild_loader_1.ESBuildMinifyPlugin({
            target: "es2015",
            css: true,
        });
        defaultMinimizer.push(esBuildMinify);
    }
    else {
        var terserOptions = {
            parallel: true,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        };
        var terserPlugin = new terser_webpack_plugin_1.default(terserOptions);
        var cssMiniPlugin = new css_minimizer_webpack_plugin_1.default();
        defaultMinimizer.push(terserPlugin);
        defaultMinimizer.push(cssMiniPlugin);
    }
    return {
        runtimeChunk: true,
        minimize: process.env.NODE_ENV === "production",
        moduleIds: "deterministic",
        minimizer: defaultMinimizer,
    };
}
;
exports.default = optimization;
