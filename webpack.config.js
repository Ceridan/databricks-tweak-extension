const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const PACKAGE = require('./package.json')

module.exports = (_, argv) => ({
  entry: {
    content: path.resolve(__dirname, 'src/js/content.js'),
    options: path.resolve(__dirname, 'src/js/options.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  context: __dirname,
  devtool: argv.mode === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/css', to: 'css' },
        { from: 'src/img', to: 'img' },
        {
          from: 'src/manifest.json',
          transform: (content) => content.toString().replace('{{PACKAGE_VERSION}}', PACKAGE.version),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options.html',
      chunks: ['options'],
    }),
  ],
})
