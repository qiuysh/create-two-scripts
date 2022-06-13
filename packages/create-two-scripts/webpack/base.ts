import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import createPlugins from "./plugins";
import createLoaders from "./loaders";
import getOptimization from "./optimization";
import {
  appSrc,
  appDist,
  appDirectory,
  getReadFilePath,
} from "../utils/defaultPaths";

const { NODE_ENV } = process.env;

function webpackConfig(opts) {
  const { ts } = opts;

  const isDev = NODE_ENV === "development" || false;

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
  const optimizations = getOptimization(opts);

  // extensions config
  const extensions = [
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
    context: appDirectory,
    mode: NODE_ENV,
    devtool: false,
    entry,
    output,
    module: {
      rules: loaders,
    },
    plugins,
    resolve: {
      modules: ["node_modules"],
      extensions,
      plugins: [],
    },
    performance: {
      // 打包性能配置
      hints: false, // 关闭性能提示
    },
    stats: {
      errorDetails: true,
    },
    optimization: optimizations,
    externals: {},
    node: false,
    target: "web",
    cache: {
      type: "filesystem",
    },
  };

  if (ts) {
    // support ts paths link to webpack resolve alias
    const appTsConfig = getReadFilePath("tsconfig.json");
    const option = {
      configFile: appTsConfig,
      extensions,
    };
    const { resolve } = webpackBaseConfig;
    // tsconfig instance
    const tsconfigPaths = new TsconfigPathsPlugin(option);
    resolve.plugins.push(tsconfigPaths);
  }

  return webpackBaseConfig;
}

export default webpackConfig;
