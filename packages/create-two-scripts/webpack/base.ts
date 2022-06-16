import { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Options } from "tsconfig-paths-webpack-plugin/lib/options";
import createPlugins from "./plugins";
import createLoaders from "./loaders";
import getOptimization from "./optimization";
import {
  appSrc,
  appDist,
  getReadFilePath,
} from "../utils/defaultPaths";
import { OptsProps } from "../typings";

const { NODE_ENV = "development" } = process.env;

function webpackConfig(opts: OptsProps): Configuration {
  const { ts } = opts;

  const isDev: boolean =
    NODE_ENV === "development" || false;

  // entry config
  const entry = {
    app: appSrc + "/index",
  };

  // output config
  const output = {
    path: appDist,
    filename: isDev
      ? "js/[name].js"
      : "js/[name].[contenthash].js",
    chunkFilename: isDev
      ? "js/[id].chunk.js"
      : "js/[id].chunk.[contenthash].js",
    publicPath: "/",
  };

  // loaders config
  const loaders = createLoaders(opts);

  // plugins config
  const plugins = createPlugins(opts);

  // optimization config
  const optimization = getOptimization(opts);

  // extensions config
  const extensions: string[] = [
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".css",
    ".less",
    ".scss",
    ".sass",
  ];

  const fallback = {
    events: false,
    fs: false,
    path: false,
    os: false,
    buffer: require.resolve('buffer'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    string_decoder: require.resolve('string_decoder'),
  };

  // default webpack config
  const webpackBaseConfig = {
    cache: {
      type: <const>"filesystem",
    },
    context: process.cwd(),
    devtool: false,
    entry,
    externals: {},
    output,
    optimization,
    plugins,
    performance: {
      hints: false,
    },
    module: {
      rules: loaders,
    },
    node: false,
    resolve: {
      modules: ["node_modules"],
      extensions,
      plugins: [] as any[],
      fallback,
    },
    resolveLoader: {},
    stats: {
      errorDetails: true,
    },
    target: "web",
    watch: false,
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  if (ts) {
    // support ts paths link to webpack resolve alias
    const appTsConfig: string =
      getReadFilePath("tsconfig.json");
    const option: Options = {
      configFile: appTsConfig,
      baseUrl: undefined,
      silent: false,
      logLevel: "WARN",
      logInfoToStdOut: false,
      context: undefined,
      colors: true,
      mainFields: ["main"],
      extensions,
    };

    const {
      resolve: { plugins = [] },
    } = webpackBaseConfig;

    if (
      Object.prototype.toString.call(plugins) ===
      "[object Array]"
    ) {
      // tsconfig instance
      const tsconfigPath: TsconfigPathsPlugin =
        new TsconfigPathsPlugin(option);

      plugins.push(tsconfigPath);
    }
  }

  return webpackBaseConfig as Configuration;
}

export default webpackConfig;
