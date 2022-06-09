"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var defaultPaths_1 = require("../utils/defaultPaths");
function createLoaders(_a) {
    var esbuild = _a.esbuild, ts = _a.ts, hot = _a.hot;
    var CssLoader = require.resolve("css-loader");
    var PostcssLoader = require.resolve("postcss-loader");
    var isDev = process.env.NODE_ENV === "development";
    var esbuildLoader = {
        loader: require.resolve("esbuild-loader"),
        options: {
            loader: ts ? "tsx" : "jsx",
            target: "es2015",
        },
    };
    var babelLoader = {
        loader: require.resolve("babel-loader"),
        options: {
            cacheDirectory: true,
            configFile: false,
            babelrc: false,
            presets: [
                [
                    require.resolve("babel-preset-two-app"),
                    {
                        ts: ts,
                        development: isDev,
                    },
                ],
            ],
            plugins: hot
                ? [require.resolve("react-refresh/babel")]
                : [],
        },
    };
    var StylesLoader = isDev
        ? require.resolve("style-loader")
        : mini_css_extract_plugin_1.default.loader;
    return [
        {
            oneOf: [
                {
                    test: /\.(j|t)s[x]?$/,
                    include: defaultPaths_1.appSrc,
                    use: [
                        esbuild ? esbuildLoader : babelLoader,
                        {
                            loader: require.resolve("thread-loader"),
                            options: {
                                workers: 3,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules\/(!antd)/,
                    use: [StylesLoader, CssLoader, PostcssLoader],
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules\/(!antd)/,
                    use: [
                        StylesLoader,
                        CssLoader,
                        {
                            loader: require.resolve("less-loader"),
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        StylesLoader,
                        CssLoader,
                        {
                            loader: require.resolve("sass-loader"),
                            options: {
                                implementation: require.resolve("sass"),
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[hash][ext][query]",
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[hash][ext][query]",
                    },
                },
            ],
        },
    ];
}
;
exports.default = createLoaders;
