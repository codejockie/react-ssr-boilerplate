import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
  entry,
  devTool,
  plugins,
  fileName,
  optimisers,
  resolvePath
} from './webpackHelpers';

export default (_, argv) => ({
  devtool: devTool(argv),
  entry: entry(argv),
  externals: {
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
  },
  output: {
    path: resolvePath('src/client/assets'),
    filename: fileName(argv),
    chunkFilename: fileName(argv),
    publicPath: '/'
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /(\.js$)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(gif|jpe?g|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'client/assets/images/[name].[hash:4].[ext]'
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'client/assets/fonts/[name].[hash:4].[ext]'
          }
        }
      },
      {
        test: /\.(aac|flac|mkv|mp3|mp4|ogg|wma|wmv)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'client/assets/media/[name].[hash:4].[ext]'
          }
        }
      }
    ]
  },
  ...optimisers(argv),
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [__dirname, 'src/client', 'node_modules'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    ...plugins(argv)
  ]
});