import { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import createPlugins from "./plugins";
import createLoaders from "./loaders";
import createOptimization from "./optimization";
import {
  appSrc,
  appDist,
  getReadFilePath,
} from "../utils/paths";
import { OptProps } from "../typings";

function webpackConfig(opts: OptProps): Configuration {
  const { ts = true, esbuild = false } = opts;

  const { NODE_ENV = "development", BABEL_ENV } =
    process.env;

  const isDev: boolean =
    (NODE_ENV || BABEL_ENV) === "development";

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
  const loaders = createLoaders({ ...opts, isDev });

  // plugins config
  const plugins = createPlugins({ ...opts, isDev });

  // optimization config
  const optimization = createOptimization({
    ...opts,
    isDev,
  });

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
    os: false,
    path: require.resolve("path-browserify"),
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    string_decoder: require.resolve("string_decoder"),
  };

  const mode: string = isDev ? "development" : "production";

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
    mode,
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
    target: <const>"web",
    watch: false,
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  if (ts) {
    // support ts paths link to webpack resolve alias
    const appTsConfig: string =
      getReadFilePath("tsconfig.json");
    const option = {
      configFile: appTsConfig,
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
