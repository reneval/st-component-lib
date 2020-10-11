const { join, resolve } = require('path');
const webpack = require('webpack');

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env;
const environment = NODE_ENV || 'development';
const isDev = environment === 'development';

module.exports = {
  mode: environment,
  devtool: isDev ? 'source-maps' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },

  entry: join(__dirname, './src/index.ts'),
  output: {
    path: join(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: "umd",
    library: "",
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: ['ts-loader'],
      },
      // SCSS modules
      {
        test: /\.styles\.scss$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'},
          { loader: 'sass-loader' },
        ],
      },
      // Regular SCSS files for global styles
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /\.styles\.scss$/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|xml)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{ loader: 'file-loader', options: { outputPath: 'assets' } }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __DEV__: isDev,
    }),
    new WebpackRTLPlugin({
      minify: false,
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'static',
        },
      ],
    }),
  ] 
};
