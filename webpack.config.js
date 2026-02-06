const path = require('path');

module.exports = {
  mode: 'production',
  entry: './admin/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/admin'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
  optimization: {
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
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
    '@strapi/strapi/admin': '@strapi/strapi/admin',
    '@strapi/design-system': '@strapi/design-system',
    '@strapi/icons': '@strapi/icons',
  },
};