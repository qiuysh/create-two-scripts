module.exports = function (opts) {
  const { antd, devMode, hot, typescript } = opts;
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
  if (typescript) {
    presets.push([
      require("@babel/preset-typescript").default,
    ]);
  }

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
