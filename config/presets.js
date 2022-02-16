/** @format */

module.exports = function (params) {
  const { antd } = params,
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
    plugins = [
      // support proposal decorators
      // NOTE: https://babeljs.io/docs/en/babel-plugin-proposal-decorators#note-compatibility-with-babelplugin-proposal-class-properties
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
    assumptions: {
      // use assignment rather than using Object.defineProperty
      setPublicClassFields: true,
    },
    presets,
    plugins,
  };
};
