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
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var shelljs_1 = require("shelljs");
var os_1 = __importDefault(require("os"));
var utils_1 = require("../utils");
var iMessage_1 = require("../utils/iMessage");
function getTemplateDir(template, projectDir) {
    var templatePath = null;
    var type = ['-d', '--debug'];
    var argv = process.argv;
    var debug = argv.length === 5 ? type.includes(argv[argv.length - 2]) : false;
    if (debug && module) {
        templatePath = module.path.replace('create-two-scripts/scripts', template);
    }
    else {
        (0, shelljs_1.exec)("cd ".concat(projectDir));
        (0, shelljs_1.exec)("yarn add ".concat(template));
        templatePath = path_1.default.join(projectDir, 'node_modules', template);
    }
    return path_1.default.join(templatePath, 'template');
}
function chalkStyle(params) {
    return chalk_1.default
        .hex("#27ae60")
        .bold(params);
}
function init(name) {
    return __awaiter(this, void 0, void 0, function () {
        var projectName, rootDir, projectDir, spinner, template, _a, name_1, description, author, _b, license, initPackageJson, templateDir, templatePackageJson, projectPackageJson, isInstall, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    projectName = name;
                    rootDir = process.cwd();
                    projectDir = "".concat(rootDir, "/").concat(projectName);
                    spinner = (0, ora_1.default)("Initializing the project...\n");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    if (fs_extra_1.default.existsSync(projectName)) {
                        throw "Waring, ".concat(projectName, " already exists");
                    }
                    fs_extra_1.default.mkdirs(projectName);
                    return [4, (0, utils_1.prompt)(iMessage_1.defaultTempData)];
                case 2:
                    template = (_c.sent()).template;
                    return [4, (0, utils_1.prompt)(iMessage_1.createPackageData)];
                case 3:
                    _a = _c.sent(), name_1 = _a.name, description = _a.description, author = _a.author, _b = _a.license, license = _b === void 0 ? "MIT" : _b;
                    initPackageJson = {
                        name: name_1,
                        version: '1.0.0',
                        private: true,
                        description: description,
                        author: author,
                        license: license,
                    };
                    spinner.start();
                    setTimeout(function () {
                        spinner.color = "#27ae60";
                        spinner.text = "Creating...\n";
                    }, 1000);
                    fs_extra_1.default.writeFileSync(path_1.default.join(projectDir, 'package.json'), JSON.stringify(initPackageJson, null, 2) + os_1.default.EOL);
                    templateDir = getTemplateDir(template, projectDir);
                    fs_extra_1.default.copySync(templateDir, projectDir);
                    templatePackageJson = fs_extra_1.default.readJSONSync(projectDir + '/package.json', "utf-8");
                    projectPackageJson = __assign(__assign({}, initPackageJson), templatePackageJson);
                    fs_extra_1.default.writeFileSync(path_1.default.join(rootDir, projectName, 'package.json'), JSON.stringify(projectPackageJson, null, 2) + os_1.default.EOL);
                    if (initPackageJson.dependencies && initPackageJson.dependencies[template]) {
                        (0, shelljs_1.exec)("cd ".concat(projectName, " && yarn remove ").concat(template));
                    }
                    spinner.succeed(chalkStyle("Success, ".concat(projectName, " is created! \n")));
                    return [4, (0, utils_1.prompt)(iMessage_1.installDependenciesData)];
                case 4:
                    isInstall = (_c.sent()).isInstall;
                    if (isInstall &&
                        (0, shelljs_1.exec)("cd ".concat(projectName, " && yarn")).code != 0) {
                        throw "Fail, install dependencies!";
                    }
                    spinner.succeed(chalkStyle("Done, you can run 'yarn start' to start ".concat(projectName, ". \n")));
                    return [3, 6];
                case 5:
                    err_1 = _c.sent();
                    spinner.fail(chalk_1.default.red(err_1));
                    spinner.stop();
                    process.exit(500);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.default = init;
