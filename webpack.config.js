const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    entry: {
      browser: './src/browser/index.js',
      node: './src/node/index.js',
      middlewares: './src/middlewares/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'lib/cjs'),
      filename: '[name].cjs.js',
      library: 'zaity',
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /(node_modules|\.test\.js$)/
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
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /(node_modules|\.test\.js$)/
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'lib/esm'),
      filename: '[name].esm.js',
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,
    },
    externals: {
      '@aws-sdk/client-transcribe': '@aws-sdk/client-transcribe',
      'socket.io-client': 'socket.io-client',
    },
  }
];
