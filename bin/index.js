#!/usr/bin/env node
const { program } = require("../utils");
const packageConf = require("../package.json");
const action = require("../lib");

program
  .usage("<command> [options]")
  .version(packageConf.version, "-v, --version")
  .description("欢迎使用 create-two-scripts 脚手架");

program
  .command("init <name>")
  .description("创建一个新的项目")
  .action((args) => {
    action("init", args);
  });

program
  .command("start")
  .description("启动项目")
  .option("-a, --antd", "support antd import on demand")
  .option(
    "-es, --esbuild",
    "support esbuild loader and compress"
  )
  .action((args) => {
    action("start", args);
  });

program
  .command("build")
  .description("构建项目")
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
