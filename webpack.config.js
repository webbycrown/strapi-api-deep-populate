

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './admin/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/admin'),
    filename: 'index.js',
    // Strapi 5 requires the admin bundle to be an ES Module
    library: {
      type: 'module',
    },
    // Ensures assets are resolved correctly within the Strapi admin
    publicPath: 'auto',
  },
  // Required by Webpack 5 to support the 'module' library type
  experiments: {
    outputModule: true,
  },
  plugins: [
    // This forces all code into a single index.js file to avoid missing chunks
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // These libraries are provided by the Strapi host app; do not bundle them
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