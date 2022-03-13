const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const detectPort = require("detect-port");
const getDevWebpackConf = require("../config/dev");
const { getUserConf } = require("../config/defaultPaths");
const { message, inquirerPrompt } = require("../utils");

/**
 * check port
 * @param {*} port
 * @returns
 */
async function checkPort(port) {
  const newPort = await detectPort(port);
  const option = [
    {
      type: "confirm",
      message: `the port ${port} has been used, use a new port ${newPort} instead ? `,
      name: "changePort",
      default: true,
    },
  ];
  if (newPort === port) {
    return newPort;
  }
  const { changePort } = await inquirerPrompt(option);
  if (!changePort) {
    throw "process has reject!";
  }
  return newPort;
}

module.exports = async function (opts) {
  const { port } = opts;
  console.log(opts);

  try {
    // user custom webpack config
    const { devServer } = getUserConf();
    // webpack config
    const webpackDevConfig = getDevWebpackConf(opts);
    // webpack config instance
    const compiler = webpack(webpackDevConfig);
    // inline port overwrite devServer port
    const realPort = await checkPort(
      port || devServer.port
    );
    // get real server port
    devServer.port = realPort;

    // devServer config
    const server = new webpackDevServer(
      devServer,
      compiler
    );
    // devServer start callback
    server.startCallback(err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    message("error", err);
    process.exit(500);
  }
};
