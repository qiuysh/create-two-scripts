import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackDevServer from "webpack-dev-server";
import detectPort from "detect-port";
import getBaseWebpackConf, {
  OptsProps,
} from "../webpack/base.js";
import {
  getUserConf,
  appPublic,
} from "../utils/defaultPaths";
import { message, prompt } from "../utils";
import { PackageProps } from "../typings";

/**
 * check port
 * @param {*} port
 * @returns
 */
async function checkPort(port: number) {
  const newPort: number = await detectPort(port);
  const option = [
    {
      type: "confirm",
      message: `The port ${port} has been used, use new port ${newPort} instead ? `,
      name: "changePort",
      default: true,
    },
  ];
  if (newPort === port) {
    return newPort;
  }
  const { changePort } = await prompt(option);
  if (!changePort) {
    throw "Process has reject!";
  }
  return newPort;
}

function getDevServer(
  customServer: PackageProps
): PackageProps {
  return {
    allowedHosts: "auto",
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
    hot: true,
    host: "0.0.0.0",
    historyApiFallback: true,
    open: true,
    port: 3001,
    static: {
      directory: appPublic,
    },
    ...customServer,
  };
}

async function start(opts: OptsProps) {
  const { port } = opts;

  try {
    // user custom webpack config
    const appUserConf = getUserConf();
    // webpack config
    const webpackBaseConfig = getBaseWebpackConf(opts);

    const webpackConf: Configuration = merge(
      webpackBaseConfig,
      {
        devtool: "eval-cheap-module-source-map",
        ...appUserConf,
      }
    );
    // webpack config instance
    const compiler = webpack(webpackConf);

    const defaultServer = getDevServer(
      appUserConf.devServer
    );

    // inline port overwrite devServer port
    const realPort = await checkPort(
      port || defaultServer.port
    );
    // get real server port
    defaultServer.port = realPort;

    // devServer config
    const server = new webpackDevServer(
      defaultServer,
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
}

export = start;
