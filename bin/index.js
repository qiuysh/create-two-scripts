#!/usr/bin/env node
const { program } = require("../utils");
const packageConf = require("../package.json");
const action = require("../lib");

program
  .usage("<command> [options]")
  .version(packageConf.version, "-v, --version")
  .description("welcome, create-two-scripts");

program
  .command("init <name>")
  .description("create a new project")
  .action((args) => {
    action("init", args);
  });

program
  .command("start")
  .description("start this project")
  .option("-a, --antd", "support antd import on demand")
  .option("-h, --hot", "support hmr in dev model")
  .option(
    "-es, --esbuild",
    "support esbuild loader and compress"
  )
  .action((args) => {
    action("start", args);
  });

program
  .command("build")
  .description("build this project")
  .option("-a, --antd", "support antd import on demand")
  .option(
    "-es, --esbuild",
    "support esbuild loader and compress"
  )
  .action((args) => {
    action("build", args);
  });

program.parse(process.argv);

if (!program.args[0]) {
  program.Help();
}
