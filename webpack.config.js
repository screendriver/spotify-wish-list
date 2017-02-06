const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const common = {
  entry: {
    app: './src/index',
    vendor: [
      'inferno',
      'inferno-component',
      'inferno-router',
      'purecss',
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
      test: /\.handlebars$/,
      loader: 'handlebars-loader',
      options: {
        inlineRequires: '\/img\/',
      },
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './src/index.html.handlebars',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    failPlugin,
  ],
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
}

if (TARGET === 'build') {
  module.exports = common;
} else if (TARGET === 'serve') {
  module.exports = merge(common, {
    plugins: [
      new DashboardPlugin(),
    ]
  });
}
