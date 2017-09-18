const path = require('path');

module.exports = {
  // webpack options
  // webpackMiddleware takes a Compiler object as first parameter
  // which is returned by webpack(...) without callback.
  entry: {
    Dates: './src/server/demo/static/components/Dates',
    TextInput: './src/server/demo/static/components/TextInput'
  },
  output: {
    path: '/',
    library: '[name]',
    libraryTarget: 'umd'
    // no real path is required, just pass '/'
    // but it will work with other paths too.
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js']
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: [{ loader: 'babel-loader' }],
        include: [
          path.join(__dirname, 'src')
        ]
      }
    ]
  }
};