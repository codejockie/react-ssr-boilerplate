const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  // Omit files from node_modules in the build since the server can access these directly
  externals: [nodeExternals()],
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};