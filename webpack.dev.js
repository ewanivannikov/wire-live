const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '',
    filename: './static/[name].bundle.js',
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public/static/'),
        publicPath: '/static/',
      },
    ],
    // headers: (v) => {
    //   console.log('❌❌❌', v);
      
    //   return { 'Service-Worker-Allowed': '/api' };
    // },
    port: 9000, // The port to bind to
    open: true, // Open the server in a browser window automatically
    hot: true, // Enable hot module replacement
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.module.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true, // Говорим о том, что хотим использовать ES Modules
              modules: {
                exportLocalsConvention: 'camel-case-only',
                namedExport: false, // Указываем, что предпочитаем именованый экспорт дефолтному
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
});
