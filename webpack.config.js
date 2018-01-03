const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';


module.exports = (() => {
  const config = {
    entry: {
      app: [
        'babel-polyfill',
        './src/app/app.js',
      ],
    },
  };

  if (isProd) {
    config.output = {
      path: `${__dirname}/dist`,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    };

    config.devtool = 'source-map';
  } else {
    config.output = {
      path: `${__dirname}/dist`,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
    };

    config.devtool = 'eval-source-map';
  }


  config.module = {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'ng-annotate-loader', options: { es6: true } },
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?',
              options: {
                url: false,
                sourceMap: true,
                minimize: isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?',
              options: {
                url: false,
                sourceMap: true,
                minimize: isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  };


  config.plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),

    new ExtractTextPlugin({
      filename: isProd ? 'css/[name].[hash].css' : 'css/[name].css',
      disable: !isProd,
      allChunks: true,
    }),
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new CopyWebpackPlugin(
        [{ from: `${__dirname}/src/public` }],
        { ignore: '.DS_Store' }
      )
    );
  }

  config.devServer = {
    contentBase: './src/public',
    host: '0.0.0.0',
  };

  return config;
})();
