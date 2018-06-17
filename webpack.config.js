const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ])
  ],

  // resolve: {
  //   extensions: ['.js', '.jsx'],
  //   alias: {
  //     // 'reducers': path.resolve(__dirname, 'src/client/reducers/'),
  //     // 'providers': path.resolve(__dirname, 'src/client/components/providers/'),
  //     // 'components': path.resolve(__dirname, 'src/client/components/'),
  //     // 'pages': path.resolve(__dirname, 'src/client/pages/'),
  //   }
  // },

  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
