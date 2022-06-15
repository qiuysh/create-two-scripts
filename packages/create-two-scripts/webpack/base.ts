import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Options } from "tsconfig-paths-webpack-plugin/lib/options";
import createPlugins from "./plugins";
import createLoaders from "./loaders";
import getOptimization from "./optimization";
import {
  appSrc,
  appDist,
  appDirectory,
  getReadFilePath,
} from "../utils/defaultPaths";

const { NODE_ENV = "development" } = process.env;

function webpackConfig(opts) {
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

  // default webpack config
  const webpackBaseConfig = {
    cache: {
      type: "filesystem",
    },
    context: appDirectory,
    devtool: false,
    entry,
    externals: {},
    externalsPresets: {},
    experiments: false,
    output,
    optimization,
    plugins,
    performance: {
      hints: false,
    },
    infrastructureLogging: {
      colors: true,
      level: "verbose",
    },
    module: {
      rules: loaders,
    },
    node: false,
    resolve: {
      modules: ["node_modules"],
      extensions,
      plugins: [],
    },
    resolveLoader: {},
    stats: {
      errorDetails: true,
    },
    snapshot: {},
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

  return webpackBaseConfig;
}

export default webpackConfig;
