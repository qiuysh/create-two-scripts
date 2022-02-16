const path = require('path');

module.exports = {

  entry: {
    app: './src/app.tsx',
  },

  resolve: {
    fallback: {
      "@": path.resolve(__dirname, './src'),
      "public": path.resolve(__dirname, './public'),
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
  },
};