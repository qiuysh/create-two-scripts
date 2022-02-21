module.exports = {
  initTypeData: [
    {
      type: "list",
      message: "请选择对应的技术栈模版",
      name: "tempType",
      choices: [
        {
          name: "React + TypeScript",
          value: "react_template",
          url: "",
          checked: true,
        },
        {
          name: "Vue + TypeScript",
          value: "vue_template",
          url: "",
        },
      ],
    },
  ],
  createTypeData: [
    {
      type: "input",
      name: "name",
      message: `package name`,
    },
    {
      type: "input",
      name: "description",
      message: "description",
    },
    {
      type: "input",
      name: "author",
      message: "author",
    },
  ],
  installTypeData: [
    {
      type: "list",
      message: "是否继续安装依赖？",
      name: "installType",
      choices: [
        {
          name: "yes",
          value: true,
          checked: true,
        },
        {
          name: "no",
          value: false,
        },
      ],
    },
  ],
};
