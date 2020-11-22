const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (_, argv) => ({
  entry: {
    content: path.resolve(__dirname, 'src/js/content.js'),
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
        { from: 'src/img', to: 'img' },
        { from: 'src/manifest.json' },
      ],
    }),
  ],
})
