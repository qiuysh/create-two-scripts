const path = require("path");

/**
 *
 * @param {*} context babel context
 * @param {*} opts custom params
 * @returns
 */
module.exports = function (context, opts = {}) {
  const { NODE_ENV, BABEL_ENV } = process.env;
  const env = BABEL_ENV || NODE_ENV;
  const isDev = env === "development";

  const {
    useTypescript,
    helpers = true,
    useESModules = true,
  } = opts;

  const absoluteRuntimePath = path.dirname(
    require.resolve("@babel/runtime/package.json")
  );

  if (
    !env ||
    (env && !["development", "production"].includes(env))
  ) {
    throw new Error(
      "Please set environment variables BABEL_ENV or NODE_ENV: development and production!"
    );
  }

  const presets = [
    [
      require("@babel/preset-env").default,
      {
        useBuiltIns: "entry",
        corejs: 3,
        // Exclude transforms that make all code slower
        exclude: ["transform-typeof-symbol"],
      },
    ],
    [
      require("@babel/preset-react").default,
      {
        development: isDev,
      },
    ],
    useTypescript && [
      require("@babel/preset-typescript").default,
    ],
  ].filter(Boolean);

  const plugins = [
    // support proposal decorators
    // https://babeljs.io/docs/en/babel-plugin-proposal-decorators
    [
      require("@babel/plugin-proposal-decorators").default,
      {
        legacy: true,
      },
    ],
    [
      require("@babel/plugin-proposal-class-properties")
        .default,
      { loose: true },
    ],
    [
      require("@babel/plugin-proposal-private-methods")
        .default,
      {
        loose: true,
      },
    ],
    [
      require("@babel/plugin-transform-private-property-in-object")
        .default,
      {
        loose: true,
      },
    ],
    [
      require("@babel/plugin-transform-runtime").default,
      {
        corejs: false,
        helpers,
        version: require("@babel/runtime/package.json")
          .version,
        regenerator: true,
        useESModules,
        absoluteRuntime: absoluteRuntimePath,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
