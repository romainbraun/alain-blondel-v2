const webpack            = require('webpack');
const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin     = require('webpack-manifest-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env) {
  return {
    entry: {
      app: './src/index.ts'
    },
    devtool: 'eval',
    mode: 'development',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            !env.production ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: 'html-loader',
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist/'),
      hot: true
    },
    plugins: [
      new ManifestPlugin(),
      new CleanWebpackPlugin(['dist']),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Alain Blondel, peintre',
        template: './src/index.html'
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets/',
        to: 'assets'
      }]),
      new MiniCssExtractPlugin({
        filename: !env.production ? '[name].css' : '[name].[hash].css',
        chunkFilename: !env.production ? '[id].css' : '[id].[hash].css',
      })
    ],
  };
};