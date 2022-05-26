const { env, argv } = process; 

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
      default: argv[argv.length - 1]
    },
    {
      type: "input",
      name: "description",
      message: "description",
      default: "a spa application with react"
    },
    {
      type: "input",
      name: "author",
      message: "author",
      default: env.USER
    },
    {
      type: "input",
      name: "license",
      message: "license",
      default: "MIT"
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
