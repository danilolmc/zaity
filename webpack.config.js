const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'zaity',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'],

  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  externals: {
    '@aws-sdk/client-transcribe': 'AWS',
  },
};
