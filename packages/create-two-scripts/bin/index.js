#!/usr/bin/env node
const { program } = require("../lib/utils");
const packageConf = require("../package.json");
const execActionInit = require("../lib/scripts/init");
const execActionStart = require("../lib/scripts/start");
const execActionBuild = require("../lib/scripts/build");

program
  .usage("<command> [options]")
  .version(packageConf.version, "-v, --version")
  .description("Welcome, use create two scripts");

program
  .command("init <name>")
  .description("create a new project")
  .option(
    "--debug",
    "Support debug init with used yarn link by local dev"
  )
  .action(args =>{
    execActionInit(args);
  });

program
  .command("start")
  .description("start the project")
  .option(
    "--port <port>",
    "Support custom start port",
    parseInt
  )
  .option("--ts <ts>", "Support typescript")
  .option("-es, --esbuild", "Support esbuild loader")
  .action(args => {
    process.env.NODE_ENV = "development";
    args.ts = args.ts === 'true';
    execActionStart(args);
  });

program
  .command("build")
  .description("build the project")
  .option("--ts <ts>", "support typescript")
  .option(
    "-es, --esbuild",
    "Support esbuild loader and compress"
  )
  .action(args => {
    process.env.NODE_ENV = "production";
    args.ts = args.ts === 'true';
    execActionBuild(args);
  });

program.parse(process.argv);

if (!program.args[0]) {
  program.help();
}
