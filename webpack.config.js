const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');

module.exports = {
  entry: {
    app: './src/index',
    vendor: [
      'inferno',
      'purecss',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[chunkhash].[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{
      test: /\.tsx$/,
      loader: 'ts-loader',
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
