const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [
            require('@babel/plugin-proposal-function-bind'),
            require('@babel/plugin-proposal-class-properties')
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|otf|ttf|eot|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'ag-grid-community': path.resolve(
        __dirname,
        'node_modules/ag-grid-community'
      ),
      'ag-grid-enterprise': path.resolve(
        __dirname,
        'node_modules/ag-grid-enterprise'
      ),
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    //publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    https: false,
    // Uncomment the following if HTTPS enabled.
    // https: {
    //   key: fs.readFileSync('//lordabbett.com/nas/SharedLibraries/common-assets/localhost.key'),
    //   cert: fs.readFileSync('//lordabbett.com/nas/SharedLibraries/common-assets/localhost.crt'),
    //   ca: fs.readFileSync('//lordabbett.com/nas/SharedLibraries/common-assets/localhost.pem'),
    // },
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    //publicPath: 'http://localhost:3000/dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Quick Start ReactJS UI',
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin(
      [{ from: 'public/data', to: 'data' },
      { from: 'public/images', to: 'images' },
      { from: 'public/fonts', to: 'fonts' },
      { from: 'public/styles', to: 'styles' },
      { from: 'public/favicon.ico', to: 'favicon.ico' },
      { from: 'public/data' },
      { from: 'configs/local.env', to: 'configs/env-config.js' },
      ], { options: {} }
    )
  ]
};
