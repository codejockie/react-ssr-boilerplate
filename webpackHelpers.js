import path from 'path';
import webpack from 'webpack';

export const DEVELOPMENT_ENV = 'development';
export const PRODUCTION_ENV = 'production';

export const resolvePath = dir => path.resolve(__dirname, dir);
export const devTool = ({ mode }) => (mode === DEVELOPMENT_ENV ? 'cheap-module-eval-sourcemap' : 'source-map');

export const entry = ({ mode }) => {
  return mode === DEVELOPMENT_ENV ? ['./src/client/index.js'] : { main: './src/client/index.js' };
};

export const plugins = ({ mode }) => {
  const isProd = mode === PRODUCTION_ENV
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? PRODUCTION_ENV : DEVELOPMENT_ENV)
      }
    })
  ]

  if (!isProd) {
    // Excluding hot module in production fixes EventSource's response has a MIME type ('text/html')
    // that is not 'text/event-stream'. Aborting the connection. error
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
};

export const fileName = ({ mode }) => {
  return mode === DEVELOPMENT_ENV ? 'bundle.js' : '[name].[chunkhash].js';
};

export const optimisers = ({ mode }) => {
  return {
    optimization: {
      minimize: !(mode !== PRODUCTION_ENV),
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
  };
};