module.exports = function () {
  return {
    contentBase: "./src",
    host: "0.0.0.0",
    port: 3001,
    historyApiFallback: true,
    open: true,
    hot: true,
    inline: true,
    before: function () { },
    proxy: [],
  };
}
