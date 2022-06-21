const path = require("path");

/**
 *
 * @param {*} context babel context
 * @param {*} opts custom params
 * @returns
 */
module.exports = function (context, opts = {}) {
  const { NODE_ENV, BABEL_ENV } = process.env;

  const isDev = (NODE_ENV || BABEL_ENV) === "development";

  const {
    useTypescript,
    helpers = true,
    useESModules = true,
  } = opts;

  const absoluteRuntimePath = path.dirname(
    require.resolve("@babel/runtime/package.json")
  );

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
  ];

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
      require("@babel/plugin-proposal-private-property-in-object")
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

  useTypescript &&
    presets.push([
      require("@babel/preset-typescript").default,
    ]);

  return {
    presets,
    plugins,
  };
};
