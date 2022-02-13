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
            name: "仪表盘",
            path: "/dashboard",
            code: "dashboard",
            icon: "icondashboard",
          },
          {
            id: 1,
            name: "工具",
            path: "/table",
            code: "table",
            icon: "iconmessage",
          },
          {
            id: 2,
            name: "表单页",
            path: "/form",
            code: "form",
            icon: "iconedit-square",
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
