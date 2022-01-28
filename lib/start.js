const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const defaultDev = require("../config/dev");
const { appUserConf } = require("../config/defaultPaths");
const { log, error } = console;

module.exports = function (args) {
  log(appUserConf)
  try {
    // WebpackDevServer.addDevServerEntrypoints(
    //   defaultDev, appUserConf
    // )

    const compiler = webpack(defaultDev)
    const server = new WebpackDevServer(compiler, appUserConf);

    compiler.hooks.done.tap('done', (stats) => {
      if (stats.hasErrors()) {
        log(
          stats.toString({
            colors: true,
          })
        );
      }
    });

    server.listen(3001, 'localhost', (err) => {
      if (err) {
        error(err);
        process.exit(500);
      }
      log('dev server listening on port 3001');
    });
  } catch (err) {
    error(err);
    process.exit(500);
  }
}
;
