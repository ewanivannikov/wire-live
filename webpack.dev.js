const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');

function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      findJsonFiles(filePath, fileList); // Рекурсивный вызов для подпапок
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

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
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/api/*.json', (req, res) => {
        
        
        
        const relativePath = req.params[0] + '.json';
        const searchDir = path.join(__dirname, 'src/data/sources/');
        const allJsonFiles = findJsonFiles(searchDir);
        
        const foundFile = allJsonFiles.find(filePath => {
          const relativeFilePath = path.resolve(searchDir + relativePath);
          return relativeFilePath === filePath;
        });

        if (foundFile) {
          fs.readFile(foundFile, 'utf-8', (err, data) => {
            if (err) {
              res.status(500).send('Error reading file');
              return;
            }
            res.json(JSON.parse(data));
          });
        } else {
          res.status(404).send('File not found');
        }
      });

      return middlewares;
    },
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
