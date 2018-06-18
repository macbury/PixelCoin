import webpack from 'webpack'
import path from 'path'

import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from 'webpack-livereload-plugin'

const outputDirectory = "dist"

export default  {
  entry: {
    main: "./app/javascripts/index.jsx"
  },

  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "[name].js",
    globalObject: "this"
  },

  devServer: {
    port: 3000,
    host: 'localhost',
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api/': "http://localhost:4000/"
    },
    overlay: {
      errors: true
    }
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js|jsx$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new LiveReloadPlugin()
  ]
}
