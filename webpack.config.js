const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = {
  entry: {
    app: './src/index',
    vendor: [
      'inferno',
      'inferno-component',
      'inferno-redux',
      'inferno-router',
      'redux',
      'redux-devtools-extension/logOnlyInProduction',
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
      ],
    }],
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
          template: './src/index.html.handlebars',
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
    });
    break;
  default:
    module.exports = common;
}
