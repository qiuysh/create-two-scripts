module.exports = function (opts) {
  const { ts } = opts;
  // presets config
  const presets = [
    [
      require("@babel/preset-env").default,
      {
        useBuiltIns: "usage",
        corejs: 3,
        // Exclude transforms that make all code slower
        exclude: ["transform-typeof-symbol"],
      },
    ],
    [
      require("@babel/preset-react").default,
      {
        development: process.env.NODE_ENV === "development",
      },
    ],
  ];
  // plugins config
  const plugins = [
    // support proposal decorators
    [
      require("@babel/plugin-proposal-decorators").default,
      { legacy: true },
    ],
    [
      require("@babel/plugin-transform-runtime").default,
      {
        corejs: false,
        version: require("@babel/runtime/package.json")
          .version,
        regenerator: true,
        absoluteRuntime: false,
      },
    ],
  ];
  // support typescript
  if (ts) {
    presets.push([
      require("@babel/preset-typescript").default,
    ]);
  }

  return {
    presets,
    plugins,
  };
};
