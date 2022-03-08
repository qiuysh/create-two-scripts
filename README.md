<div>
[![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url] [![NODE version][node-version]][node-version-url]
</div>

[download-img]: https://img.shields.io/npm/dm/create-two-scripts?logo=npm&style=flat
[download-url]: https://img.shields.io/npm/dm/create-two-scripts
[npm-version]: https://img.shields.io/npm/v/create-two-scripts?logo=npm&style=flat
[npm-version-url]: https://img.shields.io/npm/v/create-two-scripts
[node-version]: https://img.shields.io/node/v/create-two-scripts?logo=npm&style=flat
[node-version-url]: https://img.shields.io/node/v/create-two-scripts

EngLish | [中文文档](./README-zh.md)

### introduction

create-two-scripts， a simple front-end toolkit

### description

node >= 10.13.0, webpack >= 5.x and react >= 16.9.x, only suppest react + ts.

### usage

##### install

```js
npm install -g create-two-scripts

// or
yarn global add create-two-scripts
```

##### command

```js
// init project
two init <name>

// start project
two start

// build project
two build
```

##### options

1、add config file two.config.js

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

2、support params

support antd import on demand (babel-plugin-import)

```js
// two start -a
two build -a
```

support esbuild, not support the webpack plugin base ast.

```js
// two start -es
two build -es
```

support HMR, enable by default.

```js
two start -h
```


### reference

https://github.com/facebook/create-react-app