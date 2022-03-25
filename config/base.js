const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const getplugins = require("./plugins");
const getLoaders = require("./loaders");
const paths = require("./defaultPaths");

module.exports = function (opts) {
  const { devMode, typescript } = opts;
  // entry config
  const entry = {
    app: paths.appSrc + "/index",
  };

  // output config
  const output = {
    path: paths.appDist,
    filename: "js/[name].[contenthash].js",
    publicPath: "/",
  };

  // loaders config
  const loaders = getLoaders(opts);

  // plugins config
  const plugins = getplugins(opts);

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
    context: paths.appDirectory,
    mode: devMode ? "development" : "production",
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
    optimization: {
      minimize: false,
      minimizer: [],
    },
    externals: {},
    node: false,
    target: "web",
    cache: {
      type: "filesystem",
    },
  };

  if (paths.appTsConfig && typescript) {
    // support ts paths link to webpack resolve alias
    const option = {
      configFile: paths.appTsConfig,
      extensions,
    };
    const { resolve } = webpackBaseConfig;
    // tsconfig instance
    const tsconfigPaths = new TsconfigPathsPlugin(option);
    resolve.plugins.push(tsconfigPaths);
  }

  return webpackBaseConfig;
};
