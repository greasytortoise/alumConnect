module.exports = {

  entry: './client/index.js',
  output: {
    path: __dirname + "/client",
    filename: '/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
        {
          presets:['es2015', 'react']
        }
      }
    ]
  }
}
