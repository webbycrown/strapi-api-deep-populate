// webpack.server.config.js

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server/src/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: {
    '@strapi/strapi': '@strapi/strapi',
  },
  optimization: {
    minimize: true,
  },
};