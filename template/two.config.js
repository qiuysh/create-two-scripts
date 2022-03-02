const path = require('path');

module.exports = {

  entry: {
    app: './src/app.tsx',
  },

  devServer: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
  },
};