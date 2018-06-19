import webpack from 'webpack'
import path from 'path'

import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from 'webpack-livereload-plugin'

const outputDirectory = "dist"

export default  {
  entry: {
    main: './app/javascripts/index.jsx'
  },

  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "[name].js",
    globalObject: "this"
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'reducers': path.resolve(__dirname, 'app/javascripts/reducers/'),
      'containers': path.resolve(__dirname, 'app/javascripts/containers/'),
      'components': path.resolve(__dirname, 'app/javascripts/components/'),
      'actions': path.resolve(__dirname, 'app/javascripts/reducers/actions'),
      'images': path.resolve(__dirname, 'app/images'),
      'contracts': path.resolve(__dirname, 'build/contracts'),
      'metacoin': path.resolve(__dirname, 'app/javascripts/metacoin.js')
    }
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
      },
      {
        use: 'file-loader',
        test: /\.(ttf|woff|eot|woff2|png|gif|svg)$/i
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        oneOf: [
          {
            resourceQuery: /load-inline/,
            use: 'json-loader'
          },

          { loader: 'file-loader' }
        ]
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
