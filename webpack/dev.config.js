var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var ip = require('ip');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = ip.address() || 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;


// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?stage=0&optional=runtime&plugins=typecheck']},
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      //{ test: /\.sass$/, loader: 'style!css!sass?indentedSyntax'},
      { test: /\.scss/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'},
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true, 
      __SERVER__: false, // 控制API的連接位置
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development() // 會有cache
  ]
};
