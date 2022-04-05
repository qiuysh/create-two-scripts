const Mock = require("mockjs");
const delay = require('mocker-api/lib/delay');
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  "GET /api/v1/menu/list": (req, res) => {
    res.send(
      Mock.mock({
        data: [
          {
            id: 1,
            pid: 0,
            name: 'guide',
            code: 'guide',
            url: 'index',
            icon: '',
            desc: '',
            create_time: '',
            modified_time: ''
          },
        ],
        code: 1,
        msg: "执行成功",
      }),
    );
  },
};

module.exports = (noProxy ? {} : delay(proxy, 1000));
