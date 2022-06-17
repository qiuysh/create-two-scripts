import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import getBaseWebpackConf, {
  OptsProps,
} from "../webpack/base";
import { getUserConf } from "../utils/defaultPaths";
import { message } from "../utils";

function build(opts: OptsProps) {
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
