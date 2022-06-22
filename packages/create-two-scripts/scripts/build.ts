import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import getBaseWebpackConf from "../webpack/base";
import { getUserConf } from "../utils/paths";
import { message } from "../utils";
import { OptProps } from "../typings";

function build(opts: OptProps) {
  try {
    // get base webpack config
    const webpackBaseConfig = getBaseWebpackConf(opts);

    const appUserConf = getUserConf();

    const webpackConfig: Configuration = merge(
      webpackBaseConfig,
      {
        ...appUserConf,
        devServer: {},
      }
    );
    // get webpack instance
    const compiler = webpack(webpackConfig);
    // start a webpack compiler
    compiler.run(err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    message("error", err);
    process.exit(1);
  }
}

export = build;
