"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultPaths_1 = require("../utils/defaultPaths");
exports.default = {
    allowedHosts: "auto",
    client: {
        logging: "info",
        overlay: {
            errors: true,
            warnings: false,
        },
        progress: true,
    },
    compress: true,
    hot: true,
    host: "0.0.0.0",
    historyApiFallback: true,
    open: true,
    port: 3001,
    static: {
        directory: defaultPaths_1.appPublic,
    },
};
