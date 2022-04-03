[![github-ci][github-ci-img]][github-ci-url] [![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url] [![NODE version][node-version]][node-version-url]

[github-ci-img]:https://img.shields.io/github/workflow/status/qiuysh/create-two-scripts/GitHub%20Actions%20CI%20workflow?logo=github&style=flat
[github-ci-url]:https://img.shields.io/github/workflow/status/qiuysh/create-two-scripts/GitHub%20Actions%20CI%20workflow
[download-img]: https://img.shields.io/npm/dm/create-two-scripts?style=flat
[download-url]: https://img.shields.io/npm/dm/create-two-scripts
[npm-version]: https://img.shields.io/npm/v/create-two-scripts?style=flat
[npm-version-url]: https://img.shields.io/npm/v/create-two-scripts
[node-version]: https://img.shields.io/node/v/create-two-scripts?style=flat
[node-version-url]: https://img.shields.io/node/v/create-two-scripts

EngLish | [中文文档](./README-zh.md)

### Introduction

Create-two-scripts， a simple react application front-end scaffolding tool

### Description

node >= 10.13.0, webpack >= 5.x and react >= 16.9.x, only suppest react + ts.

### Usage

##### Install

```js
npm install -g create-two-scripts

// or
yarn global add create-two-scripts
```

##### Command

```js
// init project
two init <name>

// start project
two start

// build project
two build
```

##### Options

1、Add config file two.config.js

```js
module.exports = {

  entry: {},

  devServer: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
  },
};
```

2、Support params

|name   |option   | env |desc   |
|:---   |:----  |:----  |:----  |
| use ts| -t, --ts | development / production | Support typescript|
| use esbuild| -es, --esbuild | development / production | Support esbuild, not support the webpack plugin base ast.|
| custom port| -p, --port | development | set port inline|



use demo

```js
two start -es
two build -es
```


### Reference

https://github.com/facebook/create-react-app