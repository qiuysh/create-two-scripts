"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_js_1 = __importDefault(require("./init.js"));
var start_js_1 = __importDefault(require("./start.js"));
var build_js_1 = __importDefault(require("./build.js"));
exports.default = {
    init: init_js_1.default,
    start: start_js_1.default,
    build: build_js_1.default,
};
