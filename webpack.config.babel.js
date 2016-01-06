import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";

export default {
  context: __dirname,

  entry: {
    application: ["./app/javascripts/application.js"],
  },

  output: {
    path: path.join(__dirname, "dist", "2016"),
    filename: "[name].js",
    publicPath: "/2016/",
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    moduleDirectories: ["node_modules"],
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file",
        query: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
      },
      {
        test: /[/]speakers2014[/]/,
        loader: 'file',
        query: {
          name: "images/speakers2014/[name].[ext]"
        }
      },
      {
        test: /[/]keynote[/]/,
        loader: 'file',
        query: {
          name: "images/keynote/[name].[ext]"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
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

  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      title: "啥米零時政府 g0v 2016 summit",
      filename: "index.html",
      template: "app/templates/index.html"
    }),
  ],
};
