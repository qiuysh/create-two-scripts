const path = require("path");

/**
 *
 * @param {*} context babel context
 * @param {*} opts custom params
 * @returns
 */
module.exports = function (context, opts = {}) {
  const { useTypescript } = opts;

  const { NODE_ENV, BABEL_ENV } = process.env;

  const isDev = (NODE_ENV || BABEL_ENV) === "development";

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
    [
      require("@babel/plugin-proposal-decorators").default,
      {
        legacy: true,
      },
    ],
    [
      require("@babel/plugin-transform-runtime").default,
      {
        corejs: false,
        version: require("@babel/runtime/package.json")
          .version,
        regenerator: true,
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
