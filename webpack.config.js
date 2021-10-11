const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')

const PACKAGE = require('./package.json')

const config = {
  entry: {
    content: path.resolve(__dirname, 'src/js/content.js'),
    options: path.resolve(__dirname, 'src/js/options.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  context: __dirname,
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new ESLintPlugin(),
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
}

module.exports = (_, argv) => {
  config.devtool = argv.mode === 'development' ? 'source-map' : false
  if (argv.mode === 'production') {
    config.plugins.push(
      new ZipPlugin({
        path: '../out',
        filename: `DatabricksTweak_v${PACKAGE.version}.zip`,
      }),
    )
  }
  return config
}
