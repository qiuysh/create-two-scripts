const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = function (opts) {
  const { esbuild } = opts;

  const defaultMinimizer = [];

  // support esbuild compress
  if (esbuild) {
    const esBuildMinify = new ESBuildMinifyPlugin({
      target: "es2015",
      css: true,
    });
    defaultMinimizer.push(esBuildMinify);
  } else {
    const terserOptions = {
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      extractComments: false,
    };
    const terserPlugin = new TerserPlugin(terserOptions);
    const cssMiniPlugin = new CssMinimizerPlugin();
    defaultMinimizer.push(terserPlugin);
    defaultMinimizer.push(cssMiniPlugin);
  }

  return {
    runtimeChunk: true,
    minimize: process.env.NODE_ENV === "production",
    moduleIds: "deterministic",
    minimizer: defaultMinimizer,
  };
};
