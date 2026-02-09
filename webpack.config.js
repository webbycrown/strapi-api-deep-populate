const path = require('path');

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
  // ✅ REMOVED the LimitChunkCountPlugin to allow code splitting
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
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    'react-router-dom': 'react-router-dom',
    '@strapi/strapi/admin': '@strapi/strapi/admin',
    '@strapi/design-system': '@strapi/design-system',
    '@strapi/icons': '@strapi/icons',
    'styled-components': 'styled-components',
  },
};