import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { ESBuildMinifyPlugin } from "esbuild-loader";

function optimization({ esbuild }) {
  // support esbuild compress
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

  const minimizerOptions = [
    esbuild &&
      new ESBuildMinifyPlugin({
        target: "es2015",
        css: true,
      }),

    !esbuild && new TerserPlugin(terserOptions),

    !esbuild && new CssMinimizerPlugin(),
  ].filter(Boolean);

  return {
    runtimeChunk: true,
    minimize: process.env.NODE_ENV === "production",
    moduleIds: "deterministic",
    minimizer: minimizerOptions,
  };
}

export default optimization;
