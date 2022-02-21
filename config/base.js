const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const getplugins = require("./plugins");
const getLoaders = require("./loaders");
const paths = require("./defaultPaths");

module.exports = function (opts) {
  const { devMode } = opts,
    // entry config
    entry = {
      app: paths.appSrc + "/index",
    },
    // output config
    output = {
      path: paths.appDist,
      filename: "js/[name].[contenthash].js",
      publicPath: "/",
    },
    // loaders config
    loaders = getLoaders(opts),
    // plugins config
    plugins = getplugins(opts),
    // extensions config
    extensions = [
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".css",
      ".less",
      ".json",
      ".html",
    ],
    // default webpack config
    webpackBaseConfig = {
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
        modules: [paths.appModules, "node_modules"],
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

  if (paths.appTsConfig) {
    // support ts paths link to webpack resolve alias
    const option = {
        configFile: paths.appTsConfig,
        extensions,
      },
      { resolve } = webpackBaseConfig,
      // tsconfig instance
      tsconfigPaths = new TsconfigPathsPlugin(option);
    resolve.plugins.push(tsconfigPaths);
  }

  return webpackBaseConfig;
};
