const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {

  entry: {
    app: './src/app.jsx',
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'public': path.join(__dirname, 'public'),
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
    // onBeforeSetupMiddleware: function (devServer) {
    //   apiMocker(devServer.app, path.resolve('./mock/index.js'), {
    //     proxy: {
    //       '/api/(.*)': 'http://127.0.0.1:3001',
    //     },
    //     changeHost: true,
    //   })
    // },
  },
};