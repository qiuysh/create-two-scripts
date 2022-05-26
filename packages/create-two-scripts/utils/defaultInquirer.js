module.exports = {
  defaultTempData: [
    {
      type: "list",
      message: "please, select technology stack template",
      name: "template",
      choices: [
        {
          name: "React + TypeScript",
          value: "cts-template-typescript",
          checked: true,
        },
        {
          name: "React + JavaScript",
          value: "cts-template",
        },
      ],
    },
  ],
  createPackageData: [
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
    {
      type: "input",
      name: "license",
      message: "license",
    },
  ],
  installDependenciesData: [
    {
      type: "list",
      message: "Continue install dependencies ？",
      name: "isInstall",
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
