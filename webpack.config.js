const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer:{
      contentBase: __dirname
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './app')
    }
  },
  module: {
    loaders: [
      {
          test: /\.vue$/,
          loader: 'vue-loader'
      },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [path.resolve('app'), path.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[path][name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '[path][name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader","css-loader","sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
      new webpack.ExternalsPlugin('commonjs', [
        'electron'
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        babel: {
            "presets": ["es2015"],
            "plugins": ["transform-runtime"]
        },
      }
    })
  ]
}

if (prod) {
  config.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"production"`
      }
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `""`
      }
  }));
}

module.exports = config;
