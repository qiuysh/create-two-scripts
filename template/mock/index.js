/** @format */

const Mock = require("mockjs");
const delay = require("mocker-api/utils/delay");
const noProxy = process.env.NO_PROXY === "true";

const proxy = {
  "POST /mock/api/v1/login": (req, res) => {
    const { username, password } = req.body;
    let resData = {
      result: false,
      result_code: 1,
      result_message: "请检查账号或者密码！",
    };
    if (username === "admin" && password === "admin") {
      resData = {
        token: () => {
          return Mock.Random.guid();
        },
        result: true,
        result_code: 1,
        result_message: "登录成功",
      };
    }
    res.send(Mock.mock(resData));
  },
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
  "GET /mock/api/v1/dashboard/list": (req, res) => {
    res.send(
      Mock.mock({
        data: {
          line: [
            {
              x: "2012",
              "y|1-100.1-2": 0,
            },
            {
              x: "2013",
              "y|1-100.1-2": 0,
            },
            {
              x: "2014",
              "y|1-100.1-2": 0,
            },
            {
              x: "2015",
              "y|1-100.1-2": 0,
            },
            {
              x: "2016",
              "y|1-100.1-2": 0,
            },
            {
              x: "2017",
              "y|1-100.1-2": 0,
            },
            {
              x: "2018",
              "y|1-100.1-2": 0,
            },
            {
              x: "2019",
              "y|1-100.1-2": 0,
            },
          ],
          bar: [
            {
              x: "第一季度",
              "y|1-100.1-2": 0,
            },
            {
              x: "第二季度",
              "y|1-100.1-2": 0,
            },
            {
              x: "第三季度",
              "y|1-100.1-2": 0,
            },
            {
              x: "第四季度",
              "y|1-100.1-2": 0,
            },
          ],
          flipcard: {
            "sales|1-1000.1-2": 0,
            "grate|1-100.1-2": 0,
            "reduce|1-10.1-2": 0,
            "customers|1-100000.1-2": 0,
          },
        },
        result: true,
        result_code: 1,
        result_message: "执行成功",
      }),
    );
  },
  "GET /mock/api/v1/table/list": (req, res) => {
    res.send(
      Mock.mock({
        data: {
          "data|29": [
            {
              "id|+1": 0,
              name: "@name",
              "num|0-100": 0,
              desc: "@cparagraph(1,2)",
              "status|1": ["success", "warning", "error"],
              time: () => {
                return Mock.Random.now();
              },
            },
          ],
          total: 29,
        },
        result: true,
        result_code: 1,
        result_message: "执行成功",
      }),
    );
  },
};
module.exports = noProxy ? {} : delay(proxy, 1000);
