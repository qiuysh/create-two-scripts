/** @format */

const init = require("./init.js");
const start = require("./start.js");
const build = require("./build.js");

function execAction(type, ...args) {
  const command = {
    init,
    start,
    build,
  };
  command[type](...args);
}

module.exports = execAction;
