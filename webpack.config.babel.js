import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import autoprefixer from "autoprefixer";

import jld from "./jld.js";

export default {

  entry: {
    application: "./app/javascripts/application.js",
  },

  output: {
    path: path.join(__dirname, "dist", "2016"),
    filename: "[name].[hash].js",
    publicPath: "/2016/",
  },

  resolve: {
    extensions: ["", ".js", ".jsx", ".css"],
    modulesDirectories: ["app", "node_modules"],
  },

  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=50000',
        exclude: /og\.png$/, // Facebook can't recognize inline og:image.
      },
      {
        test: /app\/images\/speakers2014/,
        loader: 'file',
        query: {
          name: "images/speakers2014/[name].[ext]"
        }
      },
      {
        test: /app\/images\/keynote/,
        loader: 'file',
        query: {
          name: "images/keynote/[name].[ext]"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]-[local]__[hash:base64:5]&importLoaders=1&sourceMap!postcss')
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ]
  },

  postcss: [
    require('lost'),
    require('precss'),
    autoprefixer({ browsers: ['last 2 versions', '> 1%', 'Firefox > 20'] }),
  ],

  devServer: {
    host: process.env.HOST || 'localhost',
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/2016/',
    historyApiFallback: {index: '/2016/'},
  },

  plugins: [
    new ExtractTextPlugin("[name].[hash].css"),
    new HtmlWebpackPlugin({
      title: "啥米零時政府 g0v 2016 summit",
      jld: jld,
      description: "2014 之後又跳過了一整年，g0v summit 2016 再次邀請全球公民技術社群來分享公務員，技術人員，和非政府組織工作人員之間的協作經驗。我們很高興邀請到 Filipe Heusser 擔任今年的專題演講者，他也是 the Chilean NGO Ciudadano Inteligente 的創辦人和前股東，以及 Berkman Center 的成員。",
      filename: "index.html",
      template: "app/templates/index.html"
    }),
  ],
};
