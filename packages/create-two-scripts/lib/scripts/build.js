"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_merge_1 = require("webpack-merge");
var base_1 = __importDefault(require("../webpack/base"));
var defaultPaths_1 = require("../utils/defaultPaths");
var utils_1 = require("../utils");
function build(opts) {
    try {
        var webpackProdConfig = (0, base_1.default)(opts);
        var appUserConf = (0, defaultPaths_1.getUserConf)();
        var webpackConfig = (0, webpack_merge_1.merge)(webpackProdConfig, __assign(__assign({}, appUserConf), { devServer: {} }));
        var compiler = (0, webpack_1.default)(webpackConfig);
        compiler.run(function (err) {
            if (err) {
                throw err;
            }
        });
    }
    catch (err) {
        (0, utils_1.message)("error", err);
        process.exit(1);
    }
}
;
exports.default = build;
