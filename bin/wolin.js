#!/usr/bin/env node
const { program } = require("../util/utils");
const package = require("../package.json");
const execAction = require("../lib");

program
  .usage("<command> [options]")
  .version(package.version, "-v, --version")
  .description("欢迎使用wolin-script脚手架");

program
  .command("init <name>")
  .description("创建一个新的项目")
  .action((...args) => {
    execAction("init", args);
  });

program
  .command("start")
  .description("启动项目")
  .action((...args) => {
    execAction("start", args);
  });

program
  .command("build")
  .description("构建项目")
  .action((...args) => {
    execAction("build", args);
  });

program.parse(process.argv);

if (!program.args[0]) {
  program.Help();
}
