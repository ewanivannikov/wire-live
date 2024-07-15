const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000, // The port to bind to
    open: true, // Open the server in a browser window automatically
    hot: true, // Enable hot module replacement
  },
});
