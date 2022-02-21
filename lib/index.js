const init = require("./init.js");
const start = require("./start.js");
const build = require("./build.js");

function action(type, ...args) {
  const command = {
    init,
    start,
    build,
  };
  command[type](...args);
}

module.exports = action;
