const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.npm_lifecycle_event !== 'build',
});

const common = {
  entry: {
    app: ['core-js/es6/promise', 'whatwg-fetch', './src/index'],
    vendor: [
      'core-js/es6/promise',
      'inferno',
      'inferno-component',
      'inferno-redux',
      'inferno-router',
      'regenerator-runtime/runtime',
      'redux',
      'redux-devtools-extension/logOnlyInProduction',
      'redux-thunk',
      'purecss',
      'whatwg-fetch',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[chunkhash].[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    extractSass,
    failPlugin,
  ],
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
};

switch (process.env.npm_lifecycle_event) {
  case 'serve':
    module.exports = merge(common, {
      plugins: [
        new DashboardPlugin(),
      ],
    });
    break;
  case 'build':
    module.exports = merge(common, {
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: true,
          },
          output: {
            comments: false,
          },
          sourceMap: false,
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
      ],
      devtool: false,
    });
    break;
  default:
    module.exports = common;
}
