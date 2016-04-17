module.exports = {

  entry: './client/index.js',
  output: {
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
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
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }

    ]
  }
}
