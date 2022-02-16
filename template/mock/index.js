/** @format */

const Mock = require("mockjs");
const delay = require("mocker-api/utils/delay");
const noProxy = process.env.NO_PROXY === "true";

const proxy = {
  "GET /mock/api/v1/navigation/list": (req, res) => {
    res.send(
      Mock.mock({
        data: [
          {
            id: 0,
            name: "demo1",
            path: "/demo",
            code: "demo",
            icon: "icondashboard",
          },
        ],
        result: true,
        result_code: 1,
        result_message: "执行成功",
      }),
    );
  },
};
module.exports = noProxy ? {} : delay(proxy, 1000);
