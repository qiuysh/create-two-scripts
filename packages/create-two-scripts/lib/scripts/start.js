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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_merge_1 = require("webpack-merge");
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var detect_port_1 = __importDefault(require("detect-port"));
var base_js_1 = __importDefault(require("../webpack/base.js"));
var devServer_1 = __importDefault(require("../webpack/devServer"));
var defaultPaths_1 = require("../utils/defaultPaths");
var utils_1 = require("../utils");
function checkPort(port) {
    return __awaiter(this, void 0, void 0, function () {
        var newPort, option, changePort;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, detect_port_1.default)(port)];
                case 1:
                    newPort = _a.sent();
                    option = [
                        {
                            type: "confirm",
                            message: "The port ".concat(port, " has been used, use new port ").concat(newPort, " instead ? "),
                            name: "changePort",
                            default: true,
                        },
                    ];
                    if (newPort === port) {
                        return [2, newPort];
                    }
                    return [4, (0, utils_1.prompt)(option)];
                case 2:
                    changePort = (_a.sent()).changePort;
                    if (!changePort) {
                        throw "Process has reject!";
                    }
                    return [2, newPort];
            }
        });
    });
}
function start(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var port, appUserConf, webpackDevConfig, webpackConf, compiler, finallyDevServer, realPort, server, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    port = opts.port;
                    opts.hot = true;
                    opts.ts = typeof opts.ts === "string" ? opts.ts === 'true' : true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    appUserConf = (0, defaultPaths_1.getUserConf)();
                    webpackDevConfig = (0, base_js_1.default)(opts);
                    webpackConf = (0, webpack_merge_1.merge)(webpackDevConfig, __assign({ devtool: "eval-cheap-module-source-map" }, appUserConf));
                    compiler = (0, webpack_1.default)(webpackConf);
                    finallyDevServer = __assign(__assign({}, devServer_1.default), appUserConf.devServer);
                    return [4, checkPort(port || finallyDevServer.port)];
                case 2:
                    realPort = _a.sent();
                    finallyDevServer.port = realPort;
                    server = new webpack_dev_server_1.default(finallyDevServer, compiler);
                    server.startCallback(function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    (0, utils_1.message)("error", err_1);
                    process.exit(500);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
;
exports.default = start;
