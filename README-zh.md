[EngLish](./README.md) | 中文文档

### 简介

create-two-scripts， 一个简易的前端脚手架工具

### 说明

node >= 10.13.0 和 webpack >= 5.x，当前仅支持的模版 react + ts，

### 使用

##### 安装

```js
npm install -g create-two-scripts

// 或者
yarn global create-two-scripts
```

##### 支持命令

```js
// init project
two init <name>

// start project
two start

// build project
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

```js
// two start -a
two build -a
```

### 参考

https://github.com/facebook/create-react-app