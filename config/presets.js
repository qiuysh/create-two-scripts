module.exports = function (opts) {
  const { antd, devMode, hot } = opts;
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
        development: devMode,
      },
    ],
    [require("@babel/preset-typescript").default],
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
        regenerator: true,
      },
    ],
  ];

  // support antd import, esbuild not support ast
  if (antd) {
    plugins.push([
      require("babel-plugin-import").default,
      {
        libraryName: "antd",
        style: true,
      },
    ]);
  }
  // support HMR
  if (hot) {
    plugins.push(require.resolve("react-refresh/babel"));
  }

  return {
    presets,
    plugins,
  };
};
