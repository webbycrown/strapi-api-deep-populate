const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './admin/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/admin'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
    publicPath: 'auto',
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    // ✅ Force everything into ONE file
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // Ensure we resolve React from node_modules
    modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
  },
  externalsType: 'module',
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    '@strapi/strapi/admin': '@strapi/strapi/admin',
    '@strapi/design-system': '@strapi/design-system',
    '@strapi/icons': '@strapi/icons',
  },
};