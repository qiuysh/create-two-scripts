"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependenciesData = exports.createPackageData = exports.defaultTempData = void 0;
var env = process.env, argv = process.argv;
var defaultTempData = [
    {
        type: "list",
        message: "please, select technology stack template",
        name: "template",
        choices: [
            {
                name: "React + TypeScript",
                value: "cts-template-typescript",
                checked: true,
            },
            {
                name: "React + JavaScript",
                value: "cts-template",
            },
        ],
    },
];
exports.defaultTempData = defaultTempData;
var createPackageData = [
    {
        type: "input",
        name: "name",
        message: "package name",
        default: argv[argv.length - 1]
    },
    {
        type: "input",
        name: "description",
        message: "description",
        default: "a spa application with react"
    },
    {
        type: "input",
        name: "author",
        message: "author",
        default: env.USER
    },
    {
        type: "input",
        name: "license",
        message: "license",
        default: "MIT"
    },
];
exports.createPackageData = createPackageData;
var installDependenciesData = [
    {
        type: "list",
        message: "Continue install dependencies ？",
        name: "isInstall",
        choices: [
            {
                name: "yes",
                value: true,
                checked: true,
            },
            {
                name: "no",
                value: false,
            },
        ],
    },
];
exports.installDependenciesData = installDependenciesData;
