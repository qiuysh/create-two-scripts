import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackDevServer, {
  Configuration as DevServerConfiguration,
  Port,
} from "webpack-dev-server";
import detectPort from "detect-port";
import getBaseWebpackConf from "../webpack/base.js";
import { getUserConf, appPublic } from "../utils/paths";
import { message, prompt } from "../utils";
import { PackageProps, OptProps } from "../typings";

/**
 * check port
 * @param {*} port
 * @returns
 */
async function checkPort(
  port: Port | undefined
): Promise<number> {
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

function getDevServerConfig(
  customServer: PackageProps,
  port?: number
): DevServerConfiguration {
  const defaultServerConfig = {
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

  if (port) {
    defaultServerConfig.port = port;
  }

  return defaultServerConfig as DevServerConfiguration;
}

async function start(opts: OptProps) {
  const { port: inlinePort } = opts;

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

    const defaultServer = getDevServerConfig(
      appUserConf.devServer,
      inlinePort
    );

    // inline port overwrite devServer port
    const realPort: number = await checkPort(
      defaultServer.port
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
