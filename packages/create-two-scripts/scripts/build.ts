import webpack from "webpack";
import { merge } from "webpack-merge";
import getProdWebpackConf from "../webpack/base";
import { getUserConf } from "../utils/defaultPaths";
import { message } from "../utils";

function build (opts) {
  try {
    // get base webpack config
    const webpackProdConfig = getProdWebpackConf(opts);

    const appUserConf = getUserConf();

    const webpackConfig = merge(webpackProdConfig, {
      ...appUserConf,
      devServer: {},
    });
    // get webpack instance
    const compiler = webpack(webpackConfig);
    // start a webpack compiler
    compiler.run(err => {
      if (err) {
        throw err;
      }
    });
  } catch (err: any) {
    message("error", err);
    process.exit(1);
  }
};

export default build;