/** @format */

module.exports = function (params) {
  const { antd } = params,
    // presets config
    presets = [
      [
        require("@babel/preset-env").default,
        {
          useBuiltIns: "entry",
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ["transform-typeof-symbol"],
        },
      ],
      [require("@babel/preset-react").default],
      [require("@babel/preset-typescript").default],
    ],
    // plugins config
    plugins = [
      // support proposal decorators
      [
        require("@babel/plugin-proposal-decorators")
          .default,
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

  // support antd import
  if (antd) {
    plugins.push([
      require("babel-plugin-import").default,
      {
        libraryName: "antd",
        style: true,
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
