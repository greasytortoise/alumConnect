module.exports = {

  entry: './client/index.js',
  output: {
    path: process.env.NODE_ENV === 'production' ? './client/dist' : './client/build',
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
