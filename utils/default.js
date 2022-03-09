module.exports = {
  initTypeData: [
    {
      type: "list",
      message: "please, select technology stack template",
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
      message: "continue installing dependencies ？",
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
