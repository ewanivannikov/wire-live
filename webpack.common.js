const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wire live',
      template: './public/index.html',
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist'),
      favicon: "./public/static/assets/favicon.svg",
    }),
    new HtmlWebpackPlugin({
      title: 'Wire live',
      template: './public/404.html',
      filename: '404.html',
      path: path.resolve(__dirname, 'dist'),
      favicon: "./public/static/assets/favicon.svg",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: './static/assets/[name][ext][query]',
        },
      },
      {
        test: /\.(worklet.js|worker)$/i,
        type: 'asset/resource',
        generator: {
          filename: './static/[hash][ext][query]',
        },
      },
      {
        test: /\.(json)$/i,
        type: 'json',
        generator: {
          filename: './api/[hash][ext][query]',
        },
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['solid'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
