var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var config = module.exports = {
  context: __dirname,

  entry: {
    application: ["./app/javascripts/application.js"],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    moduleDirectories: ["node_modules"],
  },

  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
      },
      {
        test: /\.jsx$/,
        loader: 'jsx?insertPragma=React.DOM&harmony',
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap',
      },
    ]
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions', '> 1%', 'Firefox > 20'] })],

  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      title: "啥米零時政府 g0v 2016 summit",
      filename: "index.html",
      template: "app/templates/index.html"
    }),
  ],
};
