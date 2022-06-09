#!/usr/bin/env node
const { program } = require("../lib/utils");
const packageConf = require("../package.json");
const actions = require("../lib/scripts");

program
  .usage("<command> [options]")
  .version(packageConf.version, "-v, --version")
  .description("Welcome, use create two scripts");

program
  .command("init <name>")
  .description("create a new project")
  .option(
    "-d, --debug",
    "support debug init with used yarn link by local dev"
  )
  .action(args => {
    actions.init(args);
  });

program
  .command("start")
  .description("start the project")
  .option(
    "-p, --port <port>",
    "support custom start port",
    parseInt
  )
  .option("-t, --ts <ts>", "support typescript")
  .option("-es, --esbuild", "support esbuild loader")
  .action(args => {
    process.env.NODE_ENV = "development";
    actions.start(args);
  });

program
  .command("build")
  .description("build the project")
  .option("-t, --ts <ts>", "support typescript")
  .option(
    "-es, --esbuild",
    "support esbuild loader and compress"
  )
  .action(args => {
    process.env.NODE_ENV = "production";
    actions.build(args);
  });

program.parse(process.argv);

if (!program.args[0]) {
  program.help();
}
