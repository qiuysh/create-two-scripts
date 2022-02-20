EngLish | [中文文档](./README-zh.md)

### introduction

create-two-scripts， a simple front-end toolkit

### description

node >= 10.13.0 and webpack >= 5.x, only suppest react + ts.

### use

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

support antd import on demand

```js
// two start -a
two build -a
```

### reference

https://github.com/facebook/create-react-app