[![github-ci][github-ci-img]][github-ci-url] [![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url] [![NODE version][node-version]][node-version-url]

[github-ci-img]:https://img.shields.io/github/actions/workflow/status/qiuysh/create-two-scripts/ci.yml
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

node >= 10.13.0, webpack >= 5.x and react >= 16.9.x, suppest react + ts/js.

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
| Use ts| -t, --ts | development / production | support typescript  |
| Use esbuild| -es, --esbuild | development / production | Support esbuild, ast based babel plugins are not supported.(ex: babel-plugin-import)|
| Custom port| --port | development | Set port inline|



use esbuild demo

```js
two start -es
two build -es
```

use js demo, can support typescript

```js
two start
two build
```

### Reference

https://github.com/facebook/create-react-app