const { mergeWithCustomize, unique } = require('webpack-merge');
const paths = require('./defaultPaths');

/**
 * 合并 plugin 操作，
 * @param  {array} uniques plugin 名单，在这名单内的插件会过滤掉，不会出现两份，以用户的配置为准。
 * @return {array}
 */
const pluginsUnique = pluginsName =>
  unique(
    'plugins',
    pluginsName,
    plugin => plugin.constructor && plugin.constructor.name
  );

const ENV_PROD = 'production';
const ENV_DEV = 'development';

module.exports = function (program) {
  
  // const tsRule = [
  //   {
  //     test: /\.(ts|tsx)$/,
  //     exclude: /node_modules/,
  //     loader: HAPPY_PACK,
  //     options: {
  //       id: 'happy-babel-ts',
  //     },
  //   },
  // ];

  const defaultEntry = {
    app: paths.appSrc + 'index.tsx'
  }

  const defaultOutput = {
    path: paths.appDist,
    filename: 'js/[name].[hash:6].js',
    publicPath: '/',
  };

  const extensions = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.css',
    '.scss',
    '.less',
    '.json',
    '.html',
  ]

 
  /**
   * default webpack configs
   */
  const defaultWebpackConfig = {
    mode: process.env.NODE_ENV === ENV_DEV ? ENV_DEV : ENV_PROD,
    context: paths.appDirectory,
    entry: defaultEntry,
    output: defaultOutput,
    resolve: {
      modules: [paths.appModules, 'node_modules'],
      extensions,
      plugins: program.ts
        ? [
          new TsconfigPathsPlugin({
            configFile: paths.appTsConfig,
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          }),
        ]
        : [],
    },
    module: {
      // rules: tsRule,
    },
    performance: {
      //打包性能配置
      hints: false, // 关闭性能提示
    },
    plugins: tsPlugin,
    optimization: {},
    node: false,
  };

  //TODO: 用户自定义的plugins覆盖相应的default配置
  const finalWebpackConfig = mergeWithCustomize({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(defaultWebpackConfig, result.webpack);

  finalWebpackConfig.output.path = isAbsolute(finalWebpackConfig.output.path);

  // finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);

  return finalWebpackConfig;
};
