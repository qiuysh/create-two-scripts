[![github-ci][github-ci-img]][github-ci-url] [![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url] [![NODE version][node-version]][node-version-url]

[github-ci-img]:https://img.shields.io/github/workflow/status/qiuysh/create-two-scripts/GitHub%20Actions%20CI%20workflow?logo=github&style=flat
[github-ci-url]:https://img.shields.io/github/workflow/status/qiuysh/create-two-scripts/GitHub%20Actions%20CI%20workflow
[download-img]: https://img.shields.io/npm/dm/create-two-scripts?style=flat
[download-url]: https://img.shields.io/npm/dm/create-two-scripts
[npm-version]: https://img.shields.io/npm/v/create-two-scripts?style=flat
[npm-version-url]: https://img.shields.io/npm/v/create-two-scripts
[node-version]: https://img.shields.io/node/v/create-two-scripts?style=flat
[node-version-url]: https://img.shields.io/node/v/create-two-scripts

[EngLish](./README.md) | 中文文档

### 简介

create-two-scripts， 一个简易的 react 应用前端脚手架工具

### 说明

node >= 10.13.0 和 webpack >= 5.x，当前仅支持的模版 react + ts，

### 使用

##### 安装

```js
npm install -g create-two-scripts

// 或者
yarn global add create-two-scripts
```

##### 支持命令

```js
// 创建新的工程
two init <name>

// 启动
two start

// 构建
two build
```

##### 配置

1、添加配置文件 two.config.js

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

2、支持的参数

|名称    |配置   | 环境  | 描述   |
|:---   |:----  |:----  |:---- |
| 使用 ts| -t, --ts | 开发/生产|支持 typescript|
| 使用 esbuild| -es, --esbuild | 开发/生产|支持 esbuild 压缩和 loader，不支持基于 ast 的 webpack 插件。|
| 自定义端口| -p, --port | 开发 |支持端口自定义|



使用示例

```js
two start -es
two build -es
```


### 参考

https://github.com/facebook/create-react-app