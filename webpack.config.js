const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    entry: {
      browser: './src/browser/index.js',
      node: './src/node/index.js',
      middlewares: './src/middlewares/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist/cjs'),
      filename: '[name].cjs.js',
      library: 'zaity',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [new CleanWebpackPlugin()],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    externals: {
      '@aws-sdk/client-transcribe': '@aws-sdk/client-transcribe',
      'socket.io-client': 'socket.io-client',
    },
  },
  {
    entry: {
      browser: './src/browser/index.js',
      node: './src/node/index.js',
      middlewares: './src/middlewares/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist/esm'),
      filename: '[name].esm.js',
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.js'],
    },
  }
];
