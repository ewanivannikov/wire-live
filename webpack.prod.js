const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = merge(common, {
  mode: 'production',
  output: {
    filename: './static/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              defaultExport: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true, // Говорим о том, что хотим использовать ES Modules
              modules: {
                exportLocalsConvention: 'camel-case-only',
                namedExport: false, // Указываем, что предпочитаем именованый экспорт дефолтному
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  // optimization: {
  //   minimizer: [
  //     // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
  //     `...`,
  //     new CssMinimizerPlugin(),
  //   ],
  // },
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: './static/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
});

module.exports = config;
