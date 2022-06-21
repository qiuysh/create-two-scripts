const {
  env: { USER },
  argv,
} = process;

export const defaultTempData = [
  {
    type: "list",
    message: "Please, select technology stack template",
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
];

export const createPackageData = [
  {
    type: "input",
    name: "name",
    message: "package name",
    default: argv[argv.length - 1],
  },
  {
    type: "input",
    name: "description",
    message: "description",
    default: "A web application with react",
  },
  {
    type: "input",
    name: "author",
    message: "author",
    default: USER,
  },
  {
    type: "input",
    name: "license",
    message: "license",
    default: "MIT",
  },
];

export const installDepData = [
  {
    type: "list",
    message: "Continue install other dependencies ？",
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
];