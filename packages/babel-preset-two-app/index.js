const path = require("path");

module.exports = function (opts) {
  const { ts, development } = opts;

  const absoluteRuntimePath = path.dirname(
    require.resolve("@babel/runtime/package.json")
  );
  return {
    presets: [
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
          development,
        },
      ],
      ts && [require("@babel/preset-typescript").default],
    ].filter(e => e),
    plugins: [
      // support proposal decorators
      [
        require("@babel/plugin-proposal-decorators")
          .default,
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
    ],
  };
};
