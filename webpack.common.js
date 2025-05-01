const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
    new CopyPlugin({
      patterns: [
        { 
          from: "./src/data/sources/**/*.json", 
          to({ context, absoluteFilename }) {
            const dirname = path.dirname(absoluteFilename).split(path.sep);
            const targetElement = 'sources';
            const index = dirname.indexOf(targetElement);

            if (index !== -1) {
              const result = dirname.slice(index + 1);
              return `api/${result.join('/')}/[name][ext]`;
            } else {
              return "api/[path][name][ext]";
            }
          },
        },
        { 
          from: "./CNAME", 
          to: "./",
        },
        { 
          from: "./public/static/manifest.json", 
          to: "./static/",
        },
        { 
          from: "./public/static/assets/*.png", 
          to: "./static/assets/[name][ext]",
        },
      ],
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
          filename: './[hash][ext][query]',
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
