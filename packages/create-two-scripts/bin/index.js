#!/usr/bin/env node
const { program } = require("../lib/utils");
const packageConf = require("../package.json");
const execActionInit = require("../lib/scripts/init");
const execActionStart = require("../lib/scripts/start");
const execActionBuild = require("../lib/scripts/build");

program
  .usage("<command> [options]")
  .version(packageConf.version, "-v, --version")
  .description("Welcome, use create two scripts !");

program
  .command("init <name>")
  .description("Create a new project")
  .option(
    "--debug",
    "Support debug init with used yarn link by local dev"
  )
  .action(args =>{
    execActionInit(args);
  });

program
  .command("start")
  .description("Start the project")
  .option(
    "--port <port>",
    "Support custom start port inline",
    parseInt
  )
  .option("-t, --ts", "Support typescript")
  .option("-es, --esbuild", "Support esbuild loader")
  .action(args => {
    process.env.NODE_ENV = "development";
    execActionStart(args);
  });

program
  .command("build")
  .description("Build the project")
  .option("-t, --ts", "Support typescript")
  .option(
    "-es, --esbuild",
    "Support esbuild loader and compress"
  )
  .action(args => {
    process.env.NODE_ENV = "production";
    execActionBuild(args);
  });

program.parse(process.argv);

if (!program.args[0]) {
  program.help();
}
